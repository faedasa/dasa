import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isWatch = process.argv.includes('--watch');

// Ensure dist/ exists
const distDir = join(__dirname, 'dist');
if (!existsSync(distDir)) mkdirSync(distDir);

const baseConfig = {
  bundle: true,
  minify: false,
  sourcemap: isWatch ? 'inline' : false,
  target: 'es2015',
  logLevel: 'info',
};

async function build() {
  // 1) Build UI JS first (needed to inline into HTML)
  await esbuild.build({
    ...baseConfig,
    entryPoints: [join(__dirname, 'src/ui/ui.ts')],
    outfile: join(distDir, 'ui.js'),
    format: 'iife',
    platform: 'browser',
  });

  // 2) Create dist/ui.html with inlined JS
  const htmlSrc = readFileSync(join(__dirname, 'src/ui/ui.html'), 'utf-8');
  const uiJs = readFileSync(join(distDir, 'ui.js'), 'utf-8');
  const finalHtml = htmlSrc.replace('<!-- INJECT_UI_JS -->', `<script>${uiJs}</script>`);
  writeFileSync(join(distDir, 'ui.html'), finalHtml);

  // 3) Build main thread — Figma provides __html__ at runtime from manifest "ui" field
  await esbuild.build({
    ...baseConfig,
    entryPoints: [join(__dirname, 'src/main/code.ts')],
    outfile: join(distDir, 'code.js'),
    format: 'iife',
    platform: 'neutral',
  });

  console.log(isWatch ? '👀 Build done, watching...' : '✓ Build complete');
}

build().catch(() => process.exit(1));
