import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile(new URL('../dist/data/content.json', import.meta.url)));
const errors = [];
const proseKeys = new Set([
  'summary', 'limitations', 'studyText', 'detail',
  'uncertainty', 'description', 'note', 'narrative', 'limits', 'application',
  'treatment', 'quotationCheck', 'accessLimits', 'grammar', 'meaning',
  'discussion', 'greekNote', 'context', 'evidence', 'periodNote', 'mapNote',
  'status', 'text', 'previewText',
]);
const badText = /proveed|reshow|givess|showss|\b(?:teh|recieve|seperate)\b/i;

function checkText(text, path) {
  if (!text) return;
  if (/\s{2,}/.test(text)) errors.push(`${path}: repeated spaces`);
  if (badText.test(text)) errors.push(`${path}: possible typo`);
  if (/\b(?:undefined|null|NaN)\b/.test(text)) errors.push(`${path}: unfinished generated value`);
  const mayBeLabel = path.includes('.periods[') || path.endsWith('.evidence');
  if (!mayBeLabel && !/[.!?…”')\]]$/.test(text)) errors.push(`${path}: prose does not end with punctuation`);

  const sentences = text.split(/(?<=[.!?][”')\]]?)\s+/);
  for (const sentence of sentences) {
    const words = sentence.match(/[A-Za-zÀ-ÿ0-9’'-]+/g) || [];
    if (words.length > 30) errors.push(`${path}: sentence has ${words.length} words`);
  }
}

function visit(value, path = 'content', parentKey = '') {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visit(item, `${path}[${index}]`, parentKey));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    const nextPath = `${path}.${key}`;
    const quotedText = key === 'text' && (parentKey === 'excerpt' || parentKey === 'chapterStudies');
    if (typeof child === 'string' && proseKeys.has(key) && !quotedText) checkText(child, nextPath);
    else visit(child, nextPath, key);
  }
}

visit(data);
assert.equal(errors.length, 0, `Prose check failed:\n${errors.slice(0, 30).join('\n')}`);
console.log('Prose check passed: punctuation, generated values, common typos, spacing, and sentence length.');

