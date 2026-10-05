"""Advance reader cache and release notes without modifying original Isaiah."""
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
for name in ['scripts/build-native-books.py','dist/native-book.js']:
 p=ROOT/name;p.write_text(p.read_text(encoding='utf8').replace('20261005.15','20261005.16'),encoding='utf8')
p=ROOT/'README.md';p.write_text(p.read_text(encoding='utf8').replace('through Proverbs','through Ecclesiastes').replace('Ecclesiastes is next','Song of Solomon is next'),encoding='utf8')
p=ROOT/'BIBLE-EXPANSION.md';p.write_text(p.read_text(encoding='utf8').replace('- Other 45 books:', '- Ecclesiastes: all 12 chapters, 222 verses, nine profiles, and Jerusalem as the opening royal setting.\n- Other 44 books:').replace('Ecclesiastes is next in canonical order.','Song of Solomon is next in canonical order.'),encoding='utf8')
