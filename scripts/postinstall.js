#!/usr/bin/env node

// Este script garante que os módulos opcionais do Rollup sejam instalados corretamente
// Executado durante o processo de restore do Cloudflare Pages

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Verificando instalação de dependências opcionais do Rollup...');

const nodeModulesPath = path.join(__dirname, 'node_modules');
const rollupDir = path.join(nodeModulesPath, 'rollup');

if (!fs.existsSync(rollupDir)) {
  console.log('Rollup não encontrado, pulando verificação');
  process.exit(0);
}

// Detectar a plataforma
const platform = process.platform;
const arch = process.arch;

let rollupModule;
if (platform === 'linux' && arch === 'x64') {
  rollupModule = '@rollup/rollup-linux-x64-gnu';
} else if (platform === 'darwin' && arch === 'x64') {
  rollupModule = '@rollup/rollup-darwin-x64';
} else if (platform === 'darwin' && arch === 'arm64') {
  rollupModule = '@rollup/rollup-darwin-arm64';
} else if (platform === 'win32' && arch === 'x64') {
  rollupModule = '@rollup/rollup-win32-x64-msvc';
}

if (rollupModule) {
  const rollupNativeDir = path.join(nodeModulesPath, rollupModule);
  if (!fs.existsSync(rollupNativeDir)) {
    console.log(`Módulo ${rollupModule} não encontrado, tentando reinstalar...`);
    try {
      execSync(`npm install --no-save ${rollupModule} --include=optional`, {
        cwd: __dirname,
        stdio: 'inherit'
      });
      console.log(`✓ ${rollupModule} instalado com sucesso`);
    } catch (err) {
      console.warn(`⚠ Não foi possível instalar ${rollupModule}, continuando...`);
    }
  } else {
    console.log(`✓ ${rollupModule} já está instalado`);
  }
}
