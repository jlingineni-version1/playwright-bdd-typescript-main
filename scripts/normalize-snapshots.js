const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const KNOWN_TOKENS = [
  'chromium',
  'firefox',
  'webkit',
  'win32',
  'windows',
  'linux',
  'darwin',
  'mac',
  'macos',
  // Playwright attachment role tokens
  'actual',
  'expected',
  'diff',
  'previous',
];

function canonicalName(filename) {
  if (!filename) return filename;
  const ext = path.extname(filename);
  const withoutExt = filename.slice(0, filename.length - ext.length);
  const parts = withoutExt.split(/[-_]/).filter(p => !KNOWN_TOKENS.includes(p.toLowerCase()));
  const base = parts.join('-') || withoutExt;
  return base + ext.toLowerCase();
}

async function walk(dir, cb) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, cb);
    else await cb(full);
  }
}

async function main() {
  const roots = [path.join(ROOT, '.features-gen'), path.join(ROOT, 'test-results')];
  const existingRoots = [];
  for (const r of roots) {
    try {
      await fs.access(r);
      existingRoots.push(r);
    } catch (e) {
      // skip missing roots
    }
  }

  if (existingRoots.length === 0) {
    console.error('No `.features-gen` or `test-results` folders found. Run the generator/tests first.');
    process.exit(1);
  }

  const renamed = [];
  for (const searchRoot of existingRoots) {
    await walk(searchRoot, async (file) => {
    if (!file.toLowerCase().endsWith('.png')) return;
    const dir = path.dirname(file);
    const oldName = path.basename(file);
    const newName = canonicalName(oldName);
    if (oldName === newName) return;
    const target = path.join(dir, newName);
    try {
      // If target already exists, skip to avoid clobbering
      await fs.access(target);
      console.warn('Skipping', file, '->', newName, '(target exists)');
    } catch (e) {
      await fs.rename(file, target);
      renamed.push({ from: file, to: target });
      console.log('Renamed:', file, '->', target);
    }
  });
  }

  if (renamed.length === 0) {
    console.log('No snapshot files renamed.');
  } else {
    console.log(`Renamed ${renamed.length} files.`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
