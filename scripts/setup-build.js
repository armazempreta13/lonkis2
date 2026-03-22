#!/usr/bin/env node
/**
 * Script para garantir que módulos nativos sejam instalados
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

// Módulos nativos que precisam ser instalados
const nativeModules = [];

if (platform === 'linux' && arch === 'x64') {
  nativeModules.push('@rollup/rollup-linux-x64-gnu');
  nativeModules.push('lightningcss-linux-x64-gnu');
} else if (platform === 'darwin' && arch === 'x64') {
  nativeModules.push('@rollup/rollup-darwin-x64');
  nativeModules.push('lightningcss-darwin-x64');
} else if (platform === 'darwin' && arch === 'arm64') {
  nativeModules.push('@rollup/rollup-darwin-arm64');
  nativeModules.push('lightningcss-darwin-arm64');
} else if (platform === 'win32' && arch === 'x64') {
  nativeModules.push('@rollup/rollup-win32-x64-msvc');
  nativeModules.push('lightningcss-win32-x64-msvc');
}

if (nativeModules.length === 0) {
  console.warn('⚠️  Plataforma não reconhecida, continuando sem verificação de módulos nativos...');
  process.exit(0);
}

let hasErrors = false;

for (const moduleSpec of nativeModules) {
  const moduleName = moduleSpec.split('@')[moduleSpec.startsWith('@') ? 1 : 0].split('-')[0];
  const modulePath = moduleSpec.startsWith('@') ? `node_modules/${moduleSpec}` : `node_modules/${moduleSpec}`;
  const moduleDir = path.join(projectRoot, modulePath);

  if (!fs.existsSync(moduleDir)) {
    console.log(`📦 Instalando ${moduleSpec}...`);
    try {
      execSync(`npm install --no-save --legacy-peer-deps --force ${moduleSpec}`, {
        cwd: projectRoot,
        stdio: 'pipe'
      });
      console.log(`✅ ${moduleSpec} instalado com sucesso`);
    } catch (err) {
      console.warn(`⚠️  Não foi possível instalar ${moduleSpec}, tentando continuar...`);
      hasErrors = true;
    }
  } else {
    console.log(`✅ ${moduleSpec} já está instalado`);
  }
}

if (hasErrors) {
  console.warn('\n⚠️  Alguns módulos não puderam ser instalados, mas continuando...\n');
} else {
  console.log('\n✨ Todos os módulos nativos foram instalados com sucesso\n');
}

console.log('✨ Ambiente pronto para build\n');
