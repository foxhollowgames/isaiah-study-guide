"""Read selected publisher passages and retain their source text for review."""
import html,re,urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
root=Path(__file__).resolve().parent
urls=[
'https://enterthebible.org/passage/psalm-22-my-god-my-god-why-have-you-forsaken-me/',
'https://enterthebible.org/passage/psalm-23-the-lord-is-my-shepherd/',
'https://enterthebible.org/passage/psalm-44-rouse-yourself-why-do-you-sleep-o-lord/',
'https://enterthebible.org/passage/psalm-73-how-can-god-know/',
'https://enterthebible.org/passage/psalms-88-89-my-companions-are-in-darkness-i-will-sing-of-your-steadfast-love/']
def read(url):
 raw=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'BibleStudyGuide source review'}),timeout=35).read().decode('utf8')
 slug=url.strip('/').split('/')[-1]
 (root/(slug+'-review.html')).write_text(raw,encoding='utf8')
 text=re.sub(r'<script\b.*?</script>|<style\b.*?</style>','',raw,flags=re.S)
 text=html.unescape(re.sub('<[^>]+>','\n',text))
 lines=[s.strip() for s in text.splitlines() if s.strip()]
 try:start=lines.index('SUMMARY');end=next(i for i in range(start,len(lines)) if lines[i] in ['Related Passages','Sign up for Enter the Bible monthly newsletter'])
 except (ValueError,StopIteration):return url+' SECTION NOT FOUND'
 return url+'\n'+'\n'.join(lines[start:end])
for url,result in zip(urls,ThreadPoolExecutor(max_workers=3).map(read,urls)):print(result+'\n')
