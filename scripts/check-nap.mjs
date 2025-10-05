import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const allowedDigits = new Set(['8722722155']);
const allowedE164 = '+18722722155';
const rootDir = path.resolve(process.cwd(), 'src');

const digitPattern = /(?:\+?1?[\s().-]*)?\d[\d\s().-]{8,}\d/g;
const telHrefPattern = /href\s*=\s*["']tel:([^"'${}]+)["']/gi;
const telephoneFieldPattern = /"telephone"\s*:\s*"([^"]+)"/gi;

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectFiles(entryPath);
      }
      return entryPath;
    })
  );
  return files.flat();
}

function normalizeDigits(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10) {
    return null;
  }
  if (digits.length === 11) {
    if (!digits.startsWith('1')) {
      return null;
    }
    return digits.slice(1);
  }
  if (digits.length === 10) {
    return digits;
  }
  return null;
}

function getLineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

async function main() {
  const files = await collectFiles(rootDir);
  const issues = [];

  for (const file of files) {
    const content = await readFile(file, 'utf8');

    let match;
    while ((match = digitPattern.exec(content)) !== null) {
      const normalized = normalizeDigits(match[0]);
      if (!normalized) {
        continue;
      }
      if (allowedDigits.has(normalized)) {
        continue;
      }
      const line = getLineNumber(content, match.index);
      issues.push({
        file,
        line,
        value: match[0].trim(),
        type: 'number',
      });
    }

    while ((match = telHrefPattern.exec(content)) !== null) {
      const value = match[1].trim();
      if (value !== allowedE164) {
        const line = getLineNumber(content, match.index);
        issues.push({
          file,
          line,
          value: `tel:${value}`,
          type: 'tel',
        });
      }
    }

    while ((match = telephoneFieldPattern.exec(content)) !== null) {
      const value = match[1].trim();
      if (value !== allowedE164) {
        const line = getLineNumber(content, match.index);
        issues.push({
          file,
          line,
          value: `"telephone": "${value}"`,
          type: 'schema',
        });
      }
    }
  }

  if (issues.length > 0) {
    console.error('Found non-compliant phone numbers:');
    for (const issue of issues) {
      console.error(`- [${issue.type}] ${issue.file}:${issue.line} → ${issue.value}`);
    }
    process.exit(1);
  }

  console.log('NAP check passed: only the official business phone number is present.');
}

main().catch((error) => {
  console.error('Failed to complete NAP check:', error);
  process.exit(1);
});
