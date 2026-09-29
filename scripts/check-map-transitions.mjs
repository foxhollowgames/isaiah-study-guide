import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// Exercise transition interruption and cleanup without browser timing dependencies.
const app = await readFile(new URL('../dist/app.js', import.meta.url), 'utf8');
const start = app.indexOf('const mapFeatures =');
const end = app.indexOf('function visibleAt(', start);
assert(start >= 0 && end > start, 'Map transition helpers must exist');
const preference = { matches: false, addEventListener() {} };
const removed = [];
const context = vm.createContext({
  matchMedia: () => preference,
  map: { removeLayer: layer => removed.push(layer) },
  getComputedStyle: el => ({ opacity: el.currentOpacity }),
  $$: () => [],
});
vm.runInContext(app.slice(start, end), context);
const { keepMapFeature, retireMapFeatures } = context;
const collection = new Map();
let creations = 0;
function create() {
  creations++;
  const attributes = new Map([['tabindex', '0']]);
  const element = {
    style: {}, currentOpacity: '0.4', animations: [],
    hasAttribute: key => attributes.has(key),
    setAttribute: (key, value) => attributes.set(key, value),
    animate(frames, options) {
      const animation = { frames, options, cancelled: false,
        cancel() { this.cancelled = true; },
        finish() { if (!this.cancelled) this.onfinish?.(); }
      };
      this.animations.push(animation);
      return animation;
    }
  };
  return { getElement: () => element, attributes };
}

const layer = keepMapFeature(collection, 'route', create);
const entry = collection.get('route');
const entering = entry.animation;
assert.equal(keepMapFeature(collection, 'route', create), layer);
assert.equal(entry.animation, entering, 'Unchanged features must not restart');
assert.equal(creations, 1);

retireMapFeatures(collection, new Set());
assert(entering.cancelled);
assert.equal(layer.attributes.get('tabindex'), '-1');
assert.equal(layer.getElement().style.pointerEvents, 'none');
const leaving = entry.animation;
assert.equal(leaving.frames[0].opacity, '0.4', 'Interrupted fades retain current opacity');
keepMapFeature(collection, 'route', create);
assert(leaving.cancelled);
leaving.finish();
assert.equal(removed.length, 0, 'Cancelled exits must not remove returning features');
assert.equal(layer.attributes.get('tabindex'), '0');
entry.animation.finish();
retireMapFeatures(collection, new Set());
entry.animation.finish();
assert.equal(collection.size, 0);
assert.equal(removed.length, 1);

preference.matches = true;
const still = keepMapFeature(collection, 'place', create);
assert.equal(still.getElement().animations.length, 0, 'Reduced motion must skip animation');
retireMapFeatures(collection, new Set());
assert.equal(collection.size, 0, 'Reduced motion removes old features immediately');
console.log('Map transitions passed: stable identity, interrupted fades, cleanup, reduced motion.');
