import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

globalThis.document = {
  addEventListener() {},
  querySelectorAll() { return []; }
};

const { people, personProfileHtml, personIdForLabel } = await import('../dist/portraits.js');
const app = await readFile(new URL('../dist/app.js', import.meta.url), 'utf8');
const requiredPeople = [
  'rezin', 'ahaz', 'pekah', 'uzziah', 'jotham', 'david', 'isaiah',
  'hezekiah', 'sennacherib', 'rabshakeh', 'merodach-baladan',
  'nebuchadnezzar', 'cyrus', 'amoz', 'shear-jashub',
  'maher-shalal-hash-baz', 'remaliah', 'jesse', 'sargon-ii',
  'esarhaddon', 'eliakim', 'shebna', 'joah', 'nabopolassar'
];

assert.deepEqual(Object.keys(people).sort(), requiredPeople.sort(), 'Every displayed character must have one profile');
for (const [id, person] of Object.entries(people)) {
  for (const field of ['name', 'role', 'life', 'dateNote', 'importance', 'connections']) {
    assert.ok(person[field]?.trim(), `${id} needs ${field}`);
  }
  assert.ok(person.locations?.length, `${id} needs at least one key location`);
  assert.ok(person.passages?.length, `${id} needs at least one relevant passage`);
  const html = personProfileHtml(id, {backLabel:'Back to place'});
  for (const heading of ['Estimated lifespan', 'Key locations', 'Why this person matters', 'Story connections', 'Relevant passages']) {
    assert.ok(html.includes(heading), `${id} profile must show ${heading}`);
  }
  assert.ok(html.includes('data-action="person-profile-back"'), `${id} profile must support return navigation`);
}

assert.equal(personIdForLabel('Isaiah'), 'isaiah');
assert.equal(personIdForLabel('The Rabshakeh'), 'rabshakeh');
assert.equal(personIdForLabel('Amos'), 'amoz', 'Common misspelling must route to Amoz');
assert.match(people.isaiah.dateNote, /Uzziah, Jotham, Ahaz, and Hezekiah/);
assert.doesNotMatch(people.isaiah.dateNote, /chapters 36[–-]39/i, 'Isaiah profile must not present chapters 36–39 as the sole dating frame');
for (const reference of ['Isaiah 1:1', 'Isaiah 6:1–13', 'Isaiah 20:2–4', 'Isaiah 37:2–39:8']) {
  assert.ok(people.isaiah.passages.includes(reference), `Isaiah profile needs broad book coverage: ${reference}`);
}
const isaiahHtml = personProfileHtml('isaiah', {backLabel:'Back to place'});
for (const id of ['amoz', 'ahaz', 'hezekiah', 'shear-jashub', 'maher-shalal-hash-baz']) {
  assert.ok(isaiahHtml.includes(`data-person-id="${id}"`), `Isaiah profile must link to ${id}`);
}
assert.match(app, /openPersonProfile\(person\.dataset\.personId, person\)/);
assert.match(app, /openStudyModal\('contextCard', `person:\$\{personId\}`\)/);
assert.match(app, /openFeature\(feature, back\.pinned, card\._origin\)/);
assert.match(app, /card\._personProfileHistory\.push/);
assert.match(app, /sidebarPersonHistory\.push/);
assert.match(app, /sidebar-person-back/);
assert.doesNotMatch(app, /const introductions = \{\s*36:/, 'Chapter introductions must use the shared chapter data path');
console.log(`Character profiles passed: ${Object.keys(people).length} people, shared facts, modal entry, and return navigation.`);
