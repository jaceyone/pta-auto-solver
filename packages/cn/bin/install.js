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

console.log(b('📦 安装 PTA 自动解题 skill（中文版）...\n'));

mkdirSync(join(CLAUDE_DIR, 'skills'), { recursive: true });

if (existsSync(TARGET)) {
  console.log('↻ 更新中...');
  execSync('git pull', { cwd: TARGET, stdio: 'inherit' });
} else {
  execSync(`git clone --depth 1 ${REPO} "${TARGET}"`, { stdio: 'inherit' });
}

// 注册中文版路径
const skillPath = join(TARGET, 'skill');
let cfg = {};
if (existsSync(SETTINGS)) cfg = JSON.parse(readFileSync(SETTINGS, 'utf-8'));
const skills = cfg.skills || [];
if (!skills.includes(skillPath)) {
  skills.push(skillPath);
  cfg.skills = skills;
  writeFileSync(SETTINGS, JSON.stringify(cfg, null, 2) + '\n');
  console.log(g('✓ 已注册到 settings.json'));
} else {
  console.log('✓ 已注册，无需重复添加');
}

console.log(`\n${g('✅ 安装完成！')} 重启 Claude Code 即可使用\n`);
console.log(b('📖 在 Claude Code 中直接说「做 PTA 题」即可触发'));
