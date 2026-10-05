"""Advance reader cache and release notes without modifying original Isaiah."""
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
for name in ['scripts/build-native-books.py','dist/native-book.js']:
 p=ROOT/name;p.write_text(p.read_text(encoding='utf8').replace('20261005.16','20261005.17'),encoding='utf8')
p=ROOT/'README.md';p.write_text(p.read_text(encoding='utf8').replace('through Ecclesiastes','through Song of Solomon').replace('Song of Solomon is next','Jeremiah is next'),encoding='utf8')
p=ROOT/'BIBLE-EXPANSION.md';p.write_text(p.read_text(encoding='utf8').replace('- Other 44 books:', '- Song of Solomon: all 8 chapters, 117 verses, eleven profiles, and eleven map references.\n- Other 43 books:').replace('Song of Solomon is next in canonical order.','Jeremiah is next in canonical order.'),encoding='utf8')
