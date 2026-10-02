import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
const start = app.indexOf('const modalOpeningAnimations');
const end = app.indexOf('// Keep floating study windows', start);
assert.ok(start >= 0 && end > start);
let reduced = false;
const context = { matchMedia: () => ({ matches: reduced }) };
runInNewContext(app.slice(start, end), context);

for (const tagName of ['DIALOG', 'ASIDE']) {
  let hidden = true, starts = 0, shows = 0, cancels = 0;
  const panel = {
    tagName, open: false,
    showModal() { assert.equal(this.open, false); this.open = true; shows++; },
    close() { this.open = false; },
    classList: {
      contains: () => hidden,
      remove: () => { hidden = false; },
      add: () => { hidden = true; }
    },
    animate(frames, options) {
      assert.equal(options.duration, 180);
      assert.equal(options.easing, 'ease-in-out');
      starts++;
      return { cancel() { cancels++; } };
    }
  };
  context.showModalPanel(panel, 'first');
  assert.equal(starts, 1);
  context.showModalPanel(panel, 'second');
  assert.equal(starts, 2, 'Switching items in an open panel must animate.');
  assert.equal(cancels, 1, 'Switching during an animation must cancel the old animation.');
  context.showModalPanel(panel, 'second');
  assert.equal(starts, 2, 'Refreshing the same item must not restart the animation.');
  context.showModalPanel(panel, 'first');
  assert.equal(starts, 3, 'Returning to a previous item must animate.');
  if (tagName === 'DIALOG') assert.equal(shows, 1);
  context.hideModalPanel(panel);
  context.showModalPanel(panel, 'first');
  assert.equal(starts, 4, 'Reopening the same item must animate.');
  reduced = true;
  context.showModalPanel(panel, 'second');
  assert.equal(starts, 4, 'Reduced motion must skip the animation.');
  context.hideModalPanel(panel);
  reduced = false;
}
assert.match(app, /showModalPanel\(dialog, id\)/);
assert.match(app, /openStudyModal\('contextCard', f\.id\)/);
console.log('Modal motion passed: item switches, interrupted openings, refreshes, reopenings, and reduced motion.');
