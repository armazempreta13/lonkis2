#!/usr/bin/env node
/**
 * Script para garantir que módulos nativos do Rollup sejam instalados
 * corretamente antes do build no Cloudflare Pages
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

console.log('🔧 Preparando ambiente de build...');

// Detectar a plataforma
const platform = process.platform;
const arch = process.arch;

let rollupModule = '';
if (platform === 'linux' && arch === 'x64') {
  rollupModule = '@rollup/rollup-linux-x64-gnu';
} else if (platform === 'darwin' && arch === 'x64') {
  rollupModule = '@rollup/rollup-darwin-x64';
} else if (platform === 'darwin' && arch === 'arm64') {
  rollupModule = '@rollup/rollup-darwin-arm64';
} else if (platform === 'win32' && arch === 'x64') {
  rollupModule = '@rollup/rollup-win32-x64-msvc';
}

if (!rollupModule) {
  console.warn('⚠️  Plataforma não reconhecida, continuando sem verificação de Rollup...');
  process.exit(0);
}

const moduleDir = path.join(projectRoot, 'node_modules', rollupModule);

if (!fs.existsSync(moduleDir)) {
  console.log(`📦 Instalando ${rollupModule}...`);
  try {
    execSync(`npm install --no-save --legacy-peer-deps --force ${rollupModule}`, {
      cwd: projectRoot,
      stdio: 'inherit'
    });
    console.log(`✅ ${rollupModule} instalado com sucesso`);
  } catch (err) {
    console.warn(`⚠️  Não foi possível instalar ${rollupModule}, continuando...`);
  }
} else {
  console.log(`✅ ${rollupModule} já está instalado`);
}

console.log('✨ Ambiente pronto para build\n');
