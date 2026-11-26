# Terminal Mastery Lab

Uma plataforma interativa para aprender linha de comando através de missões gamificadas, inspirada no [terminal.alejandrobriz.es](https://terminal.alejandrobriz.es/).

## 🎮 Funcionalidades

- **6 Missões Progressivas**: Do básico (`pwd`, `ls`) até redes (`ssh`, `curl`)
- **Terminal Interativo**: Simula comandos reais com autocomplete (Tab) e histórico (↑↓)
- **Sistema de XP e Níveis**: Progression gamificada
- **Guia de Sobrevivência**: Documentação completa integrada
- **Conquistas**: 9 achievements desbloqueáveis
- **Bilíngue**: Português/Inglês com toggle
- **Persistência**: Progresso salvo no localStorage
- **Acessível**: Semântico, navegação por teclado, ARIA labels

## 🚀 Como Rodar Localmente

```bash
# Clone ou baixe o projeto
cd terminal-lab

# Opção 1: Python (mais simples)
python -m http.server 8000

# Opção 2: Node.js
npx serve .

# Opção 3: PHP
php -S localhost:8000

# Abra http://localhost:8000
```

## 🌐 Deploy Grátis (GitHub Pages)

### Passo a passo:

1. **Crie um repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Terminal Mastery Lab"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/terminal-lab.git
   git push -u origin main
   ```

2. **Ative GitHub Pages**
   - Vá em **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
   - Save

3. **Acesse seu site**
   - `https://SEU_USUARIO.github.io/terminal-lab/`
   - Leva 1-2 minutos para ficar online

### Com domínio próprio (opcional):
- Em Settings → Pages → Custom domain
- Adicione `terminal.seudominio.com`
- Configure CNAME no DNS do seu domínio

## 📁 Estrutura do Projeto

```
terminal-lab/
├── index.html          # HTML principal
├── styles.css          # Estilos (CSS Variables, CRT effect)
├── app.js              # Lógica principal (Vanilla JS)
├── data/
│   ├── i18n.js         # Textos PT/EN
│   ├── missions.js     # Missões, objetivos, XP, achievements
│   └── guide.js        # Conteúdo do Guia de Sobrevivência
└── README.md
```

## 🎯 Missões

| # | Título | Comandos Principais | XP |
|---|--------|---------------------|-----|
| 1 | The First Login | `pwd`, `ls` | 25 |
| 2 | Navigating the System | `cd`, caminhos relativos/absolutos | 30 |
| 3 | File Manipulation | `touch`, `mkdir`, `cp`, `mv`, `rm` | 35 |
| 4 | Processes & Jobs | `ps aux`, `grep`, `kill`, `jobs`, `fg/bg` | 40 |
| 5 | Permissions & Scripts | `ls -l`, `chmod`, shebang, `chmod +x` | 45 |
| 6 | Network & Connections | `ping`, `netstat/ss`, `curl/wget`, `ssh` | 50 |

## 🏆 Conquistas

- **First Command** - Primeiro comando executado
- **PWD Master** - Missão 1 completa
- **Navigator** - Missão 2 completa
- **File Wizard** - Missão 3 completa
- **Process Hunter** - Missão 4 completa
- **Script King** - Missão 5 completa
- **Network Pro** - Missão 6 completa
- **Combo x10** - 10 comandos certos seguidos
- **Speedrunner** - Missão em <30s

## ⌨️ Atalhos do Terminal

| Tecla | Ação |
|-------|------|
| `Tab` | Autocomplete comandos/paths |
| `↑ / ↓` | Histórico de comandos |
| `Ctrl+L` | Limpar tela |
| `Ctrl+C` | Cancelar (simulado) |
| `Enter` | Executar comando |

## 🎨 Personalização

### Cores (CSS Variables em `styles.css`):
```css
:root {
  --fg-accent: #4ade80;      /* Verde terminal */
  --fg-warning: #fbbf24;     /* Amarelo avisos */
  --fg-error: #f87171;       /* Vermelho erros */
  --fg-info: #60a5fa;        /* Azul info */
  --bg-primary: #0a0f0a;     /* Fundo principal */
}
```

### Adicionar Missões:
Edite `data/missions.js` seguindo o padrão:
```javascript
{
  id: 7,
  titleKey: 'mission7Title',
  objectives: [
    { id: 'unique_id', textKey: 'obj7_1', validate: (cmd, args, state) => {...} }
  ],
  xpReward: 60,
  hints: ['hint1']
}
```

### Adicionar Idioma:
1. Adicione bloco em `data/i18n.js`
2. Adicione botão em `index.html`
3. Atualize `app.js` no objeto `I18N`

## 📱 Responsivo

- **Desktop**: Terminal + sidebar lado a lado
- **Tablet**: Stack vertical, sidebar vira accordion
- **Mobile**: Tabs colapsáveis, terminal full-width

## ♿ Acessibilidade

- HTML semântico (`<nav>`, `<main>`, `<section>`, `<aside>`)
- ARIA labels e roles
- Navegação 100% por teclado
- Contraste WCAG AA
- `prefers-reduced-motion` respeitado
- Screen reader friendly

## 🔧 Tecnologias

- **Vanilla HTML/CSS/JS** - Zero dependências
- **CSS Variables** - Theming fácil
- **CSS Grid/Flexbox** - Layout moderno
- **localStorage** - Persistência client-side
- **ES Modules** - Organização de código

## 📄 Licença

MIT - Use livremente para aprender, ensinar ou modificar.

---

**Feito com ♥ para aprendizes de terminal** | [Ver Demo Original](https://terminal.alejandrobriz.es/)