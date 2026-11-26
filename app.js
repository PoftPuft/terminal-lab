/**
 * Terminal Mastery Lab - Main Application Logic
 * Vanilla JS, no dependencies
 */

// ============================================================================
// State Management
// ============================================================================
const State = {
  // Current language
  lang: 'pt',

  // Current active tab
  activeTab: 'missions',

  // Current mission index (0-based)
  currentMission: 0,

  // Current objective index within mission
  currentObjective: 0,

  // XP and Level
  xp: 0,
  level: 1,

  // Stats
  stats: {
    commandsRun: 0,
    missionsCompleted: 0,
    maxCombo: 0,
    currentCombo: 0,
    bestMissionTime: null,
    missionStartTime: null
  },

  // File system simulation
  fs: {
    cwd: '/home/user',
    files: {
      '/home/user': ['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos'],
      '/home/user/Documents': [],
      '/home/user/Downloads': []
    },
    dirs: {
      '/home/user': ['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos'],
      '/home/user/Documents': [],
      '/home/user/Downloads': []
    }
  },

  // Command history
  history: [],
  historyIndex: -1,

  // Autocomplete
  commands: ['pwd', 'ls', 'cd', 'touch', 'mkdir', 'cp', 'mv', 'rm', 'cat', 'ps', 'kill', 'jobs', 'fg', 'bg', 'chmod', 'ping', 'curl', 'wget', 'ssh', 'help', 'clear', 'history', 'man'],

  // Achievements unlocked
  unlockedAchievements: new Set(),

  // Mission completion times
  missionTimes: {},

  // Guide active category
  activeGuideCategory: 'basics'
};

// ============================================================================
// DOM Elements Cache
// ============================================================================
const DOM = {};

// ============================================================================
// Initialize
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  cacheDOM();
  loadState();
  applyLanguage();
  renderAll();
  setupEventListeners();
  focusInput();
  printWelcome();
});

// ============================================================================
// DOM Caching
// ============================================================================
function cacheDOM() {
  // Header
  DOM.tabs = document.querySelectorAll('.tab');
  DOM.langBtns = document.querySelectorAll('.lang-btn');
  DOM.xpFill = document.querySelector('.xp-fill');
  DOM.xpText = document.querySelector('.xp-text');
  DOM.levelBadge = document.querySelector('.level-badge');

  // Panels
  DOM.panels = document.querySelectorAll('.panel');

  // Terminal
  DOM.output = document.getElementById('output');
  DOM.cmdInput = document.getElementById('cmdInput');
  DOM.prompt = document.getElementById('prompt');

  // Mission
  DOM.missionTitle = document.getElementById('missionTitle');
  DOM.missionObjectives = document.getElementById('missionObjectives');
  DOM.hintBox = document.getElementById('hintBox');
  DOM.hintText = document.querySelector('.hint-text');

  // Guide
  DOM.guideCategories = document.querySelectorAll('.guide-category');
  DOM.guideContent = document.getElementById('guideContent');

  // Profile
  DOM.username = document.getElementById('username');
  DOM.totalXP = document.getElementById('totalXP');
  DOM.missionsDone = document.getElementById('missionsDone');
  DOM.commandsRun = document.getElementById('commandsRun');
  DOM.achievementGrid = document.getElementById('achievementGrid');
  DOM.progressBars = document.getElementById('progressBars');
}

// ============================================================================
// Persistence (localStorage)
// ============================================================================
function loadState() {
  try {
    const saved = localStorage.getItem('terminal-lab-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(State, parsed);
      // Ensure sets are restored
      if (parsed.unlockedAchievements) {
        State.unlockedAchievements = new Set(parsed.unlockedAchievements);
      }
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
}

function saveState() {
  try {
    const toSave = {
      ...State,
      unlockedAchievements: Array.from(State.unlockedAchievements)
    };
    localStorage.setItem('terminal-lab-state', JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

// ============================================================================
// Internationalization
// ============================================================================
function applyLanguage() {
  document.documentElement.lang = State.lang === 'pt' ? 'pt-BR' : 'en';

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (I18N[State.lang] && I18N[State.lang][key]) {
      el.innerHTML = I18N[State.lang][key];
    }
  });

  // Update language buttons
  DOM.langBtns.forEach(btn => {
    const isActive = btn.dataset.lang === State.lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  // Re-render dynamic content
  renderMission();
  renderGuide();
  renderProfile();
}

function t(key) {
  return I18N[State.lang]?.[key] || key;
}

// ============================================================================
// Rendering
// ============================================================================
function renderAll() {
  renderTabs();
  renderXP();
  renderMission();
  renderGuide();
  renderProfile();
}

function renderTabs() {
  DOM.tabs.forEach(tab => {
    const isActive = tab.dataset.tab === State.activeTab;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive);
  });

  DOM.panels.forEach(panel => {
    const isActive = panel.id === `${State.activeTab}-panel`;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
}

function renderXP() {
  const levelData = LEVELS.find(l => l.minXP <= State.xp) || LEVELS[LEVELS.length - 1];
  const nextLevel = LEVELS.find(l => l.minXP > State.xp) || LEVELS[LEVELS.length - 1];

  const currentLevelXP = levelData.minXP;
  const nextLevelXP = nextLevel.minXP;
  const progress = nextLevelXP > currentLevelXP
    ? ((State.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
    : 100;

  DOM.xpFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  DOM.xpText.textContent = `${State.xp} / ${nextLevelXP > currentLevelXP ? nextLevelXP : 'MAX'}`;
  DOM.levelBadge.textContent = t(levelData.key);
}

function renderMission() {
  const mission = MISSIONS[State.currentMission];
  if (!mission) return;

  DOM.missionTitle.textContent = t(mission.titleKey);

  // Render objectives
  DOM.missionObjectives.innerHTML = mission.objectives.map((obj, idx) => {
    const isCompleted = idx < State.currentObjective;
    const isCurrent = idx === State.currentObjective;
    return `
      <div class="objective ${isCompleted ? 'completed' : ''} ${isCurrent && !isCompleted ? 'current' : ''}" data-objective="${idx}">
        <span class="obj-check" aria-hidden="true">${isCompleted ? '✓' : '○'}</span>
        <span class="obj-text">${t(obj.textKey)}</span>
      </div>
    `;
  }).join('');

  // Update hint
  const hintKey = mission.hints?.[Math.min(State.currentObjective, mission.hints.length - 1)] || 'hint1';
  DOM.hintText.innerHTML = t(hintKey);
}

function renderGuide() {
  const category = GUIDE_CONTENT[State.activeGuideCategory];
  if (!category) return;

  let html = `<div class="guide-section fade-in">`;

  category.sections.forEach(section => {
    switch (section.type) {
      case 'intro':
        html += `<p>${t(section.contentKey)}</p>`;
        break;
      case 'heading':
        html += `<h3>${t(section.contentKey)}</h3>`;
        break;
      case 'paragraph':
        html += `<p>${t(section.contentKey)}</p>`;
        break;
      case 'tips':
        html += '<ul>';
        section.items.forEach(tipKey => {
          html += `<li>${t(tipKey)}</li>`;
        });
        html += '</ul>';
        break;
      case 'codeList':
        html += '<div class="command-examples">';
        section.items.forEach(exKey => {
          html += `<div class="cmd-example"><code>${t(exKey)}</code></div>`;
        });
        html += '</div>';
        break;
      case 'definitionList':
        html += '<dl class="definition-list">';
        section.items.forEach(item => {
          html += `<dt><code>${t(item.termKey)}</code></dt><dd>${t(item.defKey)}</dd>`;
        });
        html += '</dl>';
        break;
    }
  });

  html += '</div>';
  DOM.guideContent.innerHTML = html;
}

function renderProfile() {
  // Stats
  DOM.totalXP.textContent = State.xp;
  DOM.missionsDone.textContent = State.stats.missionsCompleted;
  DOM.commandsRun.textContent = State.stats.commandsRun;

  // Achievements
  DOM.achievementGrid.innerHTML = ACHIEVEMENTS.map(ach => {
    const unlocked = State.unlockedAchievements.has(ach.id);
    return `
      <div class="achievement ${unlocked ? 'unlocked' : ''}" data-achievement="${ach.id}">
        <span class="achievement-icon">${getAchievementIcon(ach.id)}</span>
        <span class="achievement-name">${t(ach.nameKey)}</span>
      </div>
    `;
  }).join('');

  // Progress bars
  DOM.progressBars.innerHTML = MISSIONS.map((mission, idx) => {
    const completed = idx < State.stats.missionsCompleted;
    const current = idx === State.currentMission && !completed;
    const progress = completed ? 100 : (current ? ((State.currentObjective / mission.objectives.length) * 100) : 0);
    return `
      <div class="progress-item">
        <div class="progress-info">
          <span class="progress-label">${t(mission.titleKey)}</span>
          <span class="progress-value">${Math.round(progress)}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    `;
  }).join('');

  // Check and unlock achievements
  checkAchievements();
}

function getAchievementIcon(achId) {
  const icons = {
    first_command: '▶',
    pwd_master: '📍',
    navigator: '🧭',
    file_wizard: '📁',
    process_hunter: '🎯',
    script_king: '📜',
    network_pro: '🌐',
    combo_10: '🔥',
    speedrunner: '⚡'
  };
  return icons[achId] || '★';
}

// ============================================================================
// Terminal Logic
// ============================================================================
function printWelcome() {
  printLine(t('msg_welcome'), 'info-output');
}

function printLine(text, className = '') {
  const line = document.createElement('div');
  line.className = `output-line ${className}`;
  line.innerHTML = text;
  DOM.output.appendChild(line);
  scrollToBottom();
}

function printPrompt() {
  const cwd = State.fs.cwd.replace('/home/user', '~');
  DOM.prompt.textContent = `user@mast-lab:${cwd}$`;
}

function scrollToBottom() {
  DOM.output.scrollTop = DOM.output.scrollHeight;
}

function focusInput() {
  // Tenta focar múltiplas vezes para garantir (fix GitHub Pages timing)
  const tryFocus = () => {
    if (DOM.cmdInput && document.activeElement !== DOM.cmdInput) {
      DOM.cmdInput.focus({ preventScroll: true });
    }
  };
  tryFocus();
  setTimeout(tryFocus, 50);
  setTimeout(tryFocus, 200);
}

// ============================================================================
// Command Processing
// ============================================================================
function processCommand(rawCmd) {
  const cmd = rawCmd.trim();
  if (!cmd) {
    printPrompt();
    return;
  }

  // Add to history
  State.history.push(cmd);
  State.historyIndex = State.history.length;
  State.stats.commandsRun++;

  // Echo command
  printLine(`<span class="prompt-echo">user@mast-lab:${State.fs.cwd.replace('/home/user', '~')}$</span> ${escapeHtml(cmd)}`, 'prompt-echo');

  // Parse command
  const parts = parseCommand(cmd);
  const baseCmd = parts[0];
  const args = parts.slice(1);

  // Execute command
  let output = '';
  let isError = false;
  let isSuccess = false;
  let objectiveCompleted = false;

  // Check mission objective
  const mission = MISSIONS[State.currentMission];
  const currentObj = mission?.objectives[State.currentObjective];

  if (currentObj && currentObj.validate(cmd, args, State)) {
    objectiveCompleted = true;
    if (currentObj.onComplete) {
      output = currentObj.onComplete(State) || '';
    }
    isSuccess = true;
  } else {
    // Execute built-in command
    const result = executeCommand(baseCmd, args, cmd);
    output = result.output;
    isError = result.isError;
    isSuccess = result.isSuccess;
  }

  // Print output
  if (output) {
    const className = isError ? 'error-output' : (isSuccess ? 'success-output' : 'command-output');
    printLine(output, className);
  }

  // Handle objective completion
  if (objectiveCompleted) {
    State.currentObjective++;
    State.stats.currentCombo++;
    State.stats.maxCombo = Math.max(State.stats.maxCombo, State.stats.currentCombo);

    printLine(t('obj_complete').replace('{obj}', t(currentObj.textKey)), 'success-output');

    // Check if mission complete
    if (State.currentObjective >= mission.objectives.length) {
      completeMission(mission);
    } else {
      renderMission();
    }
  } else if (baseCmd !== 'help' && baseCmd !== 'clear' && baseCmd !== 'history') {
    // Failed command breaks combo (except meta commands)
    State.stats.currentCombo = 0;
  }

  // Update stats display
  if (State.activeTab === 'profile') {
    renderProfile();
  }

  printPrompt();
  saveState();
}

function parseCommand(cmd) {
  // Simple parser that respects quotes
  const result = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < cmd.length; i++) {
    const char = cmd[i];

    if ((char === '"' || char === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
    } else if (char === quoteChar && inQuotes) {
      inQuotes = false;
      quoteChar = '';
    } else if (char === ' ' && !inQuotes) {
      if (current) {
        result.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current) result.push(current);
  return result;
}

function executeCommand(baseCmd, args, rawCmd) {
  switch (baseCmd) {
    case 'help':
      return { output: t('cmd_help'), isSuccess: true };

    case 'clear':
      DOM.output.innerHTML = '';
      return { output: '', isSuccess: true };

    case 'history':
      const historyOutput = State.history.map((c, i) => `${i + 1}  ${c}`).join('\n');
      return { output: historyOutput || '(empty)', isSuccess: true };

    case 'pwd':
      return { output: State.fs.cwd, isSuccess: true };

    case 'ls':
      const path = args[0] ? resolvePath(args[0]) : State.fs.cwd;
      const files = State.fs.files[path] || [];
      const dirs = State.fs.dirs[path] || [];
      const all = [...dirs.map(d => `<span style="color:var(--fg-info)">${d}/</span>`), ...files.map(f => f)];
      return { output: all.join('  ') || '(empty)', isSuccess: true };

    case 'cd':
      const target = args[0] || '~';
      const newPath = resolvePath(target);

      // Check if directory exists
      if (State.fs.dirs[newPath] !== undefined || newPath === '/home/user' || newPath.startsWith('/home/user/')) {
        State.fs.cwd = newPath;
        return { output: '', isSuccess: true };
      } else {
        return { output: t('invalid_path').replace('{path}', target), isError: true };
      }

    case 'touch':
      if (!args[0]) return { output: 'touch: missing file operand', isError: true };
      const touchPath = resolvePath(args[0]);
      const touchDir = touchPath.substring(0, touchPath.lastIndexOf('/')) || '/';
      if (!State.fs.files[touchDir]) State.fs.files[touchDir] = [];
      if (!State.fs.files[touchDir].includes(args[0])) {
        State.fs.files[touchDir].push(args[0]);
      }
      return { output: '', isSuccess: true };

    case 'mkdir':
      if (!args[0]) return { output: 'mkdir: missing operand', isError: true };
      const mkdirPath = resolvePath(args[0]);
      const mkdirParent = mkdirPath.substring(0, mkdirPath.lastIndexOf('/')) || '/';
      if (!State.fs.dirs[mkdirParent]) State.fs.dirs[mkdirParent] = [];
      if (!State.fs.dirs[mkdirParent].includes(args[0])) {
        State.fs.dirs[mkdirParent].push(args[0]);
      }
      // Also add to files list so ls shows it
      if (!State.fs.files[mkdirParent]) State.fs.files[mkdirParent] = [];
      if (!State.fs.files[mkdirParent].includes(args[0] + '/')) {
        State.fs.files[mkdirParent].push(args[0] + '/');
      }
      return { output: '', isSuccess: true };

    case 'cp':
    case 'mv':
      if (args.length < 2) return { output: `${baseCmd}: missing operand`, isError: true };
      return { output: '', isSuccess: true };

    case 'rm':
      if (!args[0]) return { output: 'rm: missing operand', isError: true };
      return { output: '', isSuccess: true };

    case 'cat':
      if (!args[0]) return { output: 'cat: missing operand', isError: true };
      return { output: `[content of ${args[0]}]`, isSuccess: true };

    case 'ps':
      if (args.includes('aux')) {
        return {
          output: `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
user         1  0.0  0.1  12345  6789 ?        Ss   10:00   0:00 /init
user       123  0.5  2.1  45678 12345 ?        Sl   10:05   0:12 /usr/bin/code
user       456  0.0  0.3  23456  3456 pts/0    Ss   10:10   0:00 bash
user       789  0.0  0.1  11111   567 pts/0    R+   10:15   0:00 ps aux`,
          isSuccess: true
        };
      }
      return { output: '  PID TTY          TIME CMD\n 456 pts/0    00:00:00 bash\n 789 pts/0    00:00:00 ps', isSuccess: true };

    case 'kill':
      if (!args[0]) return { output: 'kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ...', isError: true };
      return { output: '', isSuccess: true };

    case 'jobs':
      return { output: '[1]+  Running                 sleep 100 &', isSuccess: true };

    case 'fg':
    case 'bg':
      return { output: '', isSuccess: true };

    case 'chmod':
      if (args.length < 2) return { output: 'chmod: missing operand', isError: true };
      return { output: '', isSuccess: true };

    case 'ping':
      return {
        output: `PING ${args[0] || '8.8.8.8'} (${args[0] || '8.8.8.8'}) 56(84) bytes of data.
64 bytes from ${args[0] || '8.8.8.8'}: icmp_seq=1 ttl=115 time=12.3 ms
64 bytes from ${args[0] || '8.8.8.8'}: icmp_seq=2 ttl=115 time=11.8 ms
--- ${args[0] || '8.8.8.8'} ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms`,
        isSuccess: true
      };

    case 'netstat':
    case 'ss':
      return {
        output: `State      Recv-Q Send-Q Local Address:Port               Peer Address:Port
LISTEN     0      128    0.0.0.0:22                    0.0.0.0:*
LISTEN     0      128    0.0.0.0:80                    0.0.0.0:*
ESTAB      0      0      192.168.1.5:54321             142.250.185.46:443`,
        isSuccess: true
      };

    case 'curl':
    case 'wget':
      return {
        output: `  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   123    0   123    0     0    456      0 --:--:-- --:--:-- --:--:--   456`,
        isSuccess: true
      };

    case 'ssh':
      return {
        output: `The authenticity of host '${args[0] || 'server.example.com'} (1.2.3.4)' can't be established.
ED25519 key fingerprint is SHA256:abc123...
Are you sure you want to continue connecting? (yes/no) yes
Warning: Permanently added '${args[0] || 'server.example.com'}' (ED25519) to the list of known hosts.
user@server:~$`,
        isSuccess: true
      };

    case 'man':
      if (!args[0]) return { output: 'What manual page do you want?', isError: true };
      return { output: `MANUAL PAGE FOR ${args[0].toUpperCase()}\n\nThis is a simulated man page. In a real terminal, use 'man ${args[0]}' for full documentation.`, isSuccess: true };

    default:
      return { output: t('cmd_not_found').replace('{cmd}', baseCmd), isError: true };
  }
}

function resolvePath(path) {
  if (path === '~' || path === '$HOME') return '/home/user';
  if (path.startsWith('~/')) return '/home/user' + path.slice(1);
  if (path.startsWith('/')) return path;

  // Relative path
  let base = State.fs.cwd;
  const parts = path.split('/');

  for (const part of parts) {
    if (part === '..') {
      base = base.substring(0, base.lastIndexOf('/')) || '/';
    } else if (part === '.' || part === '') {
      continue;
    } else {
      base = base + (base.endsWith('/') ? '' : '/') + part;
    }
  }

  return base;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================================================
// Mission Completion
// ============================================================================
function completeMission(mission) {
  const xpEarned = mission.xpReward;
  State.xp += xpEarned;
  State.stats.missionsCompleted++;
  State.currentMission++;
  State.currentObjective = 0;
  State.stats.currentCombo = 0;

  // Record mission time
  if (State.stats.missionStartTime) {
    const elapsed = Date.now() - State.stats.missionStartTime;
    State.missionTimes[mission.id] = elapsed;
    if (!State.stats.bestMissionTime || elapsed < State.stats.bestMissionTime) {
      State.stats.bestMissionTime = elapsed;
    }
    State.stats.missionStartTime = Date.now();
  }

  // Check level up
  const newLevel = LEVELS.findIndex(l => l.minXP > State.xp) || LEVELS.length;
  if (newLevel > State.level) {
    State.level = newLevel;
    printLine(t('msg_level_up').replace('{level}', t(LEVELS[newLevel - 1].key)), 'success-output');
  }

  printLine(t('msg_mission_complete').replace('{xp}', xpEarned), 'success-output');

  // Unlock first command achievement
  if (State.stats.commandsRun >= 1) {
    unlockAchievement('first_command');
  }

  // Mission-specific achievements
  const missionAchievements = {
    1: 'pwd_master',
    2: 'navigator',
    3: 'file_wizard',
    4: 'process_hunter',
    5: 'script_king',
    6: 'network_pro'
  };

  if (missionAchievements[mission.id]) {
    unlockAchievement(missionAchievements[mission.id]);
  }

  // Check combo achievement
  if (State.stats.maxCombo >= 10) {
    unlockAchievement('combo_10');
  }

  // Check speedrunner
  if (State.stats.bestMissionTime && State.stats.bestMissionTime < 30000) {
    unlockAchievement('speedrunner');
  }

  renderXP();
  renderMission();
  renderProfile();
  saveState();

  // If all missions done
  if (State.currentMission >= MISSIONS.length) {
    printLine('🎉 All missions complete! You are a Terminal Master!', 'success-output');
  }
}

// ============================================================================
// Achievements
// ============================================================================
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!State.unlockedAchievements.has(ach.id) && ach.condition(State.stats)) {
      unlockAchievement(ach.id);
    }
  });
}

function unlockAchievement(achId) {
  if (State.unlockedAchievements.has(achId)) return;

  State.unlockedAchievements.add(achId);
  const ach = ACHIEVEMENTS.find(a => a.id === achId);
  if (ach) {
    printLine(`🏆 Achievement Unlocked: ${t(ach.nameKey)}`, 'success-output');
  }

  if (State.activeTab === 'profile') {
    renderProfile();
  }
  saveState();
}

// ============================================================================
// Event Listeners
// ============================================================================
function setupEventListeners() {
  // Tab switching
  DOM.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      State.activeTab = tab.dataset.tab;
      renderTabs();

      // Start mission timer when entering missions tab
      if (State.activeTab === 'missions' && !State.stats.missionStartTime) {
        State.stats.missionStartTime = Date.now();
      }

      // Render profile when switching to it
      if (State.activeTab === 'profile') {
        renderProfile();
      }

      focusInput();
    });
  });

  // Language toggle
  DOM.langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      State.lang = btn.dataset.lang;
      applyLanguage();
      focusInput();
    });
  });

  // Guide categories
  DOM.guideCategories.forEach(btn => {
    btn.addEventListener('click', () => {
      State.activeGuideCategory = btn.dataset.category;
      DOM.guideCategories.forEach(b => b.classList.toggle('active', b === btn));
      renderGuide();
    });
  });

  // Terminal input
  DOM.cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = DOM.cmdInput.value;
      DOM.cmdInput.value = '';
      processCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (State.historyIndex > 0) {
        State.historyIndex--;
        DOM.cmdInput.value = State.history[State.historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (State.historyIndex < State.history.length - 1) {
        State.historyIndex++;
        DOM.cmdInput.value = State.history[State.historyIndex] || '';
      } else {
        State.historyIndex = State.history.length;
        DOM.cmdInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autocomplete();
    }
  });

  // Keep input focused
  document.addEventListener('click', (e) => {
    if (State.activeTab === 'missions') {
      focusInput();
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      DOM.output.innerHTML = '';
      printPrompt();
    }
  });
}

// ============================================================================
// Autocomplete
// ============================================================================
function autocomplete() {
  const value = DOM.cmdInput.value;
  const parts = value.split(' ');
  const lastPart = parts[parts.length - 1];

  // Command completion (first word)
  if (parts.length === 1) {
    const matches = State.commands.filter(c => c.startsWith(lastPart));
    if (matches.length === 1) {
      DOM.cmdInput.value = matches[0] + ' ';
    } else if (matches.length > 1) {
      // Show common prefix
      const commonPrefix = matches.reduce((a, b) => {
        let i = 0;
        while (i < a.length && i < b.length && a[i] === b[i]) i++;
        return a.substring(0, i);
      });
      if (commonPrefix.length > lastPart.length) {
        DOM.cmdInput.value = commonPrefix;
      } else {
        // Show suggestions
        printLine(matches.join('  '), 'info-output');
        printPrompt();
      }
    }
  }
  // Path completion (simplified)
  else {
    const matches = getPathCompletions(lastPart);
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      DOM.cmdInput.value = parts.join(' ') + ' ';
    } else if (matches.length > 1) {
      const commonPrefix = matches.reduce((a, b) => {
        let i = 0;
        while (i < a.length && i < b.length && a[i] === b[i]) i++;
        return a.substring(0, i);
      });
      if (commonPrefix.length > lastPart.length) {
        parts[parts.length - 1] = commonPrefix;
        DOM.cmdInput.value = parts.join(' ') + ' ';
      } else {
        printLine(matches.join('  '), 'info-output');
        printPrompt();
      }
    }
  }
}

function getPathCompletions(partial) {
  const dir = partial.includes('/')
    ? partial.substring(0, partial.lastIndexOf('/') + 1)
    : '';
  const prefix = partial.includes('/')
    ? partial.substring(partial.lastIndexOf('/') + 1)
    : partial;

  const basePath = resolvePath(dir || '.');
  const items = [...(State.fs.dirs[basePath] || []), ...(State.fs.files[basePath] || [])];

  return items
    .filter(item => item.startsWith(prefix))
    .map(item => dir + item + (State.fs.dirs[basePath]?.includes(item) ? '/' : ''));
}

// ============================================================================
// Export for testing (optional)
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { State, processCommand, parseCommand, resolvePath };
}