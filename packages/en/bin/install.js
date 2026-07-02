#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const CLAUDE_DIR = join(homedir(), '.claude');
const SETTINGS = join(CLAUDE_DIR, 'settings.json');
const TARGET = join(CLAUDE_DIR, 'skills', 'pta-auto-solver');
const REPO = 'https://github.com/jaceyone/pta-auto-solver.git';

const g = s => `\x1b[32m${s}\x1b[0m`, b = s => `\x1b[34m${s}\x1b[0m`;

console.log(b('📦 Installing PTA Auto Solver skill (English)...\n'));

mkdirSync(join(CLAUDE_DIR, 'skills'), { recursive: true });

if (existsSync(TARGET)) {
  console.log('↻ Updating...');
  execSync('git pull', { cwd: TARGET, stdio: 'inherit' });
} else {
  execSync(`git clone --depth 1 ${REPO} "${TARGET}"`, { stdio: 'inherit' });
}

// Register English version path
const skillPath = join(TARGET, 'skill-en');
let cfg = {};
if (existsSync(SETTINGS)) cfg = JSON.parse(readFileSync(SETTINGS, 'utf-8'));
const skills = cfg.skills || [];
if (!skills.includes(skillPath)) {
  skills.push(skillPath);
  cfg.skills = skills;
  writeFileSync(SETTINGS, JSON.stringify(cfg, null, 2) + '\n');
  console.log(g('✓ Registered in settings.json'));
} else {
  console.log('✓ Already registered');
}

console.log(`\n${g('✅ Done!')} Restart Claude Code and you're ready.\n`);
console.log(b('📖 Say "solve PTA problems" in Claude Code to trigger'));
