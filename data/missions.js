/**
 * Terminal Mastery Lab - Missions Data
 * Defines all missions, objectives, and validation logic
 */

const MISSIONS = [
  {
    id: 1,
    titleKey: 'mission1Title',
    objectives: [
      {
        id: 'pwd',
        textKey: 'obj1_1',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'pwd';
        },
        onComplete: (state) => {
          state.fs.cwd = '/home/user';
          return 'home/user';
        }
      },
      {
        id: 'ls',
        textKey: 'obj1_2',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'ls';
        },
        onComplete: (state) => {
          return `Desktop  Documents  Downloads  Music  Pictures  Videos`;
        }
      }
    ],
    xpReward: 25,
    hints: ['hint1', 'hint2']
  },
  {
    id: 2,
    titleKey: 'mission2Title',
    objectives: [
      {
        id: 'cd_docs',
        textKey: 'obj2_1',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return parts[0] === 'cd' && parts[1] && (parts[1] === 'Documents' || parts[1] === 'docs' || parts[1] === 'Documents/');
        },
        onComplete: (state) => {
          state.fs.cwd = '/home/user/Documents';
          return '';
        }
      },
      {
        id: 'cd_relative',
        textKey: 'obj2_2',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return parts[0] === 'cd' && parts[1] && parts[1].startsWith('..');
        },
        onComplete: (state) => {
          state.fs.cwd = '/home/user';
          return '';
        }
      },
      {
        id: 'cd_home',
        textKey: 'obj2_3',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return parts[0] === 'cd' && (parts[1] === '~' || parts[1] === '' || parts[1] === '$HOME');
        },
        onComplete: (state) => {
          state.fs.cwd = '/home/user';
          return '';
        }
      }
    ],
    xpReward: 30,
    hints: ['hint2', 'hint3']
  },
  {
    id: 3,
    titleKey: 'mission3Title',
    objectives: [
      {
        id: 'touch_file',
        textKey: 'obj3_1',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return parts[0] === 'touch' && parts[1];
        },
        onComplete: (state) => {
          const parts = cmd.trim().split(/\s+/);
          const filename = parts[1];
          if (!state.fs.files[state.fs.cwd]) state.fs.files[state.fs.cwd] = [];
          if (!state.fs.files[state.fs.cwd].includes(filename)) {
            state.fs.files[state.fs.cwd].push(filename);
          }
          return '';
        }
      },
      {
        id: 'mkdir_dir',
        textKey: 'obj3_2',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return parts[0] === 'mkdir' && parts[1];
        },
        onComplete: (state) => {
          const parts = cmd.trim().split(/\s+/);
          const dirname = parts[1];
          if (!state.fs.dirs[state.fs.cwd]) state.fs.dirs[state.fs.cwd] = [];
          if (!state.fs.dirs[state.fs.cwd].includes(dirname)) {
            state.fs.dirs[state.fs.cwd].push(dirname);
          }
          return '';
        }
      },
      {
        id: 'cp_mv',
        textKey: 'obj3_3',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return (parts[0] === 'cp' || parts[0] === 'mv') && parts[1] && parts[2];
        },
        onComplete: (state) => {
          return '';
        }
      },
      {
        id: 'rm_file',
        textKey: 'obj3_4',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return parts[0] === 'rm' && parts[1];
        },
        onComplete: (state) => {
          return '';
        }
      }
    ],
    xpReward: 35,
    hints: ['hint3', 'hint4']
  },
  {
    id: 4,
    titleKey: 'mission4Title',
    objectives: [
      {
        id: 'ps_aux',
        textKey: 'obj4_1',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'ps' && cmd.includes('aux');
        },
        onComplete: (state) => {
          return `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
user         1  0.0  0.1  12345  6789 ?        Ss   10:00   0:00 /init
user       123  0.5  2.1  45678 12345 ?        Sl   10:05   0:12 /usr/bin/code
user       456  0.0  0.3  23456  3456 pts/0    Ss   10:10   0:00 bash
user       789  0.0  0.1  11111   567 pts/0    R+   10:15   0:00 ps aux`;
        }
      },
      {
        id: 'grep_process',
        textKey: 'obj4_2',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'grep' || (baseCmd === 'ps' && cmd.includes('grep'));
        },
        onComplete: (state) => {
          return `user       123  0.5  2.1  45678 12345 ?        Sl   10:05   0:12 /usr/bin/code`;
        }
      },
      {
        id: 'kill_process',
        textKey: 'obj4_3',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return parts[0] === 'kill' && parts[1];
        },
        onComplete: (state) => {
          return '';
        }
      },
      {
        id: 'jobs_fg_bg',
        textKey: 'obj4_4',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return ['jobs', 'fg', 'bg'].includes(baseCmd);
        },
        onComplete: (state) => {
          if (cmd.trim().split(' ')[0] === 'jobs') {
            return `[1]+  Running                 sleep 100 &`;
          }
          return '';
        }
      }
    ],
    xpReward: 40,
    hints: ['hint3', 'hint4']
  },
  {
    id: 5,
    titleKey: 'mission5Title',
    objectives: [
      {
        id: 'ls_l',
        textKey: 'obj5_1',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'ls' && cmd.includes('-l');
        },
        onComplete: (state) => {
          return `-rw-r--r-- 1 user user  0 Nov 25 10:00 arquivo.txt
drwxr-xr-x 2 user user 4096 Nov 25 10:00 documentos
-rwxr-xr-x 1 user user  123 Nov 25 10:00 script.sh`;
        }
      },
      {
        id: 'chmod_file',
        textKey: 'obj5_2',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return parts[0] === 'chmod' && parts[1] && parts[2];
        },
        onComplete: (state) => {
          return '';
        }
      },
      {
        id: 'create_script',
        textKey: 'obj5_3',
        validate: (cmd, args, state) => {
          const parts = cmd.trim().split(/\s+/);
          return (parts[0] === 'touch' || parts[0] === 'cat' || parts[0] === 'echo') && parts[1] && parts[1].endsWith('.sh');
        },
        onComplete: (state) => {
          return '';
        }
      },
      {
        id: 'shebang',
        textKey: 'obj5_4',
        validate: (cmd, args, state) => {
          return cmd.includes('#!/bin/bash') || cmd.includes('#!/bin/sh');
        },
        onComplete: (state) => {
          return '';
        }
      }
    ],
    xpReward: 45,
    hints: ['hint3', 'hint4']
  },
  {
    id: 6,
    titleKey: 'mission6Title',
    objectives: [
      {
        id: 'ping_test',
        textKey: 'obj6_1',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'ping';
        },
        onComplete: (state) => {
          return `PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=12.3 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=115 time=11.8 ms
--- 8.8.8.8 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms`;
        }
      },
      {
        id: 'netstat_ss',
        textKey: 'obj6_2',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'netstat' || baseCmd === 'ss';
        },
        onComplete: (state) => {
          return `State      Recv-Q Send-Q Local Address:Port               Peer Address:Port
LISTEN     0      128    0.0.0.0:22                    0.0.0.0:*
LISTEN     0      128    0.0.0.0:80                    0.0.0.0:*
ESTAB      0      0      192.168.1.5:54321             142.250.185.46:443`;
        }
      },
      {
        id: 'curl_wget',
        textKey: 'obj6_3',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'curl' || baseCmd === 'wget';
        },
        onComplete: (state) => {
          return `  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   123    0   123    0     0    456      0 --:--:-- --:--:-- --:--:--   456`;
        }
      },
      {
        id: 'ssh_connect',
        textKey: 'obj6_4',
        validate: (cmd, args, state) => {
          const baseCmd = cmd.trim().split(' ')[0];
          return baseCmd === 'ssh';
        },
        onComplete: (state) => {
          return `The authenticity of host 'server.example.com (1.2.3.4)' can't be established.
ED25519 key fingerprint is SHA256:abc123...
Are you sure you want to continue connecting? (yes/no) yes
Warning: Permanently added 'server.example.com' (ED25519) to the list of known hosts.
user@server:~$`;
        }
      }
    ],
    xpReward: 50,
    hints: ['hint3', 'hint4']
  }
];

// Level thresholds
const LEVELS = [
  { minXP: 0, key: 'levelNovice' },
  { minXP: 100, key: 'levelBeginner' },
  { minXP: 250, key: 'levelIntermediate' },
  { minXP: 500, key: 'levelAdvanced' },
  { minXP: 1000, key: 'levelExpert' },
  { minXP: 2000, key: 'levelMaster' }
];

// Achievements
const ACHIEVEMENTS = [
  { id: 'first_command', nameKey: 'ach_first_command', descKey: 'ach_first_command_desc', condition: (stats) => stats.commandsRun >= 1 },
  { id: 'pwd_master', nameKey: 'ach_pwd_master', descKey: 'ach_pwd_master_desc', condition: (stats) => stats.missionsCompleted >= 1 },
  { id: 'navigator', nameKey: 'ach_navigator', descKey: 'ach_navigator_desc', condition: (stats) => stats.missionsCompleted >= 2 },
  { id: 'file_wizard', nameKey: 'ach_file_wizard', descKey: 'ach_file_wizard_desc', condition: (stats) => stats.missionsCompleted >= 3 },
  { id: 'process_hunter', nameKey: 'ach_process_hunter', descKey: 'ach_process_hunter_desc', condition: (stats) => stats.missionsCompleted >= 4 },
  { id: 'script_king', nameKey: 'ach_script_king', descKey: 'ach_script_king_desc', condition: (stats) => stats.missionsCompleted >= 5 },
  { id: 'network_pro', nameKey: 'ach_network_pro', descKey: 'ach_network_pro_desc', condition: (stats) => stats.missionsCompleted >= 6 },
  { id: 'combo_10', nameKey: 'ach_combo_10', descKey: 'ach_combo_10_desc', condition: (stats) => stats.maxCombo >= 10 },
  { id: 'speedrunner', nameKey: 'ach_speedrunner', descKey: 'ach_speedrunner_desc', condition: (stats) => stats.bestMissionTime && stats.bestMissionTime < 30000 }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MISSIONS, LEVELS, ACHIEVEMENTS };
}