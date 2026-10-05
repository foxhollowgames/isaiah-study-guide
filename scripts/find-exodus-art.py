import importlib.util,json,time
from book_common import ROOT
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');art=importlib.util.module_from_spec(spec);spec.loader.exec_module(art)
queries={'moses':'intitle:Moses intitle:Rembrandt','aaron':'intitle:Aaron intitle:Tissot','miriam':'intitle:Miriam painting','jochebed':'intitle:Jochebed','amram':'intitle:Amram Bible','pharaoh-daughter':'intitle:Finding intitle:Moses','shiphrah':'intitle:Shiphrah','puah':'intitle:Puah','zipporah':'intitle:Zipporah','jethro':'intitle:Jethro Bible','pharaoh':'intitle:Pharaoh intitle:Moses','joshua':'intitle:Joshua intitle:Tissot','hur':'intitle:Moses intitle:Hur','bezalel':'intitle:Bezalel Bible','oholiab':'intitle:Oholiab','nadab':'intitle:Nadab intitle:Abihu','abihu':'intitle:Nadab intitle:Abihu','eleazar':'intitle:Eleazar priest','ithamar':'intitle:Ithamar'}
p=ROOT/'scripts/exodus-art-candidates.json';records=json.loads(p.read_text(encoding='utf-8')) if p.exists() else {}
for pid,query in queries.items():
    if pid in records:continue
    _,items=art.search((pid,query));items=[i for i in items if not i['title'].lower().endswith(('.pdf','.djvu'))];records[pid]=items;p.write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8');print(pid,[(n,i['title']) for n,i in enumerate(items)],flush=True);time.sleep(3)
