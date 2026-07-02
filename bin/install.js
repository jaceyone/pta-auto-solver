#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const CLAUDE_DIR = join(homedir(), '.claude');
const SETTINGS = join(CLAUDE_DIR, 'settings.json');
const TARGET = join(CLAUDE_DIR, 'skills', 'pta-auto-solver');
const REPO = 'https://github.com/jaceyone/pta-auto-solver.git';

const g = s => `\x1b[32m${s}\x1b[0m`, b = s => `\x1b[34m${s}\x1b[0m`, r = s => `\x1b[31m${s}\x1b[0m`;

console.log(b('📦 Installing PTA Auto Solver skill...\n'));

// 1. Check git
try { execSync('git --version', { stdio: 'ignore' }); }
catch { console.error(r('❌ git is required')); process.exit(1); }

// 2. Clone
mkdirSync(join(CLAUDE_DIR, 'skills'), { recursive: true });
if (existsSync(TARGET)) {
  console.log('↻ Updating...');
  execSync('git pull', { cwd: TARGET, stdio: 'inherit' });
} else {
  console.log(`→ Cloning ${REPO}`);
  execSync(`git clone --depth 1 "${REPO}" "${TARGET}"`, { stdio: 'inherit' });
}

// 3. Register BOTH Chinese and English versions
const skillPaths = [
  join(TARGET, 'skill'),      // 中文版
  join(TARGET, 'skill-en'),   // English
];

let cfg = {};
if (existsSync(SETTINGS)) {
  try { cfg = JSON.parse(readFileSync(SETTINGS, 'utf-8')); } catch {}
}

const skills = cfg.skills || [];
for (const p of skillPaths) {
  if (!skills.includes(p)) skills.push(p);
}
cfg.skills = skills;
writeFileSync(SETTINGS, JSON.stringify(cfg, null, 2) + '\n');
console.log(g('✓ Registered in ~/.claude/settings.json'));

console.log(`\n${g('✅ Installation complete!')} Restart Claude Code.\n`);
console.log('   🇨🇳 中文版  → say "做 PTA 题"');
console.log('   🇬🇧 English → say "solve PTA problems"');
