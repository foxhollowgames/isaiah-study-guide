"""Advance the adapted reader cache and release notes without changing Isaiah."""
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
for name in ['scripts/build-native-books.py','dist/native-book.js']:
 p=ROOT/name;t=p.read_text(encoding='utf8');p.write_text(t.replace('20261005.12','20261005.13'),encoding='utf8')
p=ROOT/'BIBLE-EXPANSION.md';t=p.read_text(encoding='utf8')
t=t.replace('- Other 47 books:', '- Psalms: all 150 psalms, 2,461 verses, 39 selected profiles, and 15 reference places.\n- Other 46 books:')
t=t.replace('Psalms is next in canonical order.','Proverbs is next in canonical order.')
p.write_text(t,encoding='utf8')
p=ROOT/'README.md';t=p.read_text(encoding='utf8')
t=t.replace('through Job','through Psalms').replace('Psalms is next','Proverbs is next')
p.write_text(t,encoding='utf8')
