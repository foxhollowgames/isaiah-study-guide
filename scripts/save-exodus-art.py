import importlib.util,json,shutil
from concurrent.futures import ThreadPoolExecutor
from book_common import ROOT,OUT
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');tool=importlib.util.module_from_spec(spec);spec.loader.exec_module(tool)
candidates=json.loads((ROOT/'scripts/exodus-art-candidates.json').read_text(encoding='utf-8'))
selected={'moses':0,'aaron':0,'miriam':0,'jochebed':0,'pharaoh-daughter':0,'zipporah':2,'pharaoh':1,'joshua':1,'hur':0,'bezalel':0,'nadab':0,'abihu':1,'eleazar':3}
target=ROOT/'dist/assets/portraits/exodus';target.mkdir(parents=True,exist_ok=True)
def save(pair):
    pid,index=pair;item=candidates[pid][index];relative=f'assets/portraits/exodus/{pid}.jpg';(ROOT/'dist'/relative).write_bytes(tool.request(item['url']))
    return pid,dict(item,src=relative,note='Historical art illustrates the person or story. It does not establish actual appearance.')
records=dict(ThreadPoolExecutor(max_workers=3).map(save,selected.items()))
for pid,file in {'shiphrah':'exec-7eddcc9e-eec6-427a-9e41-f4c6cfebda2a.png','puah':'exec-b1462818-2188-4499-a76b-7bfce07b6658.png','amram':'exec-de8708bf-12c8-4110-ac95-7b990a456717.png','oholiab':'exec-caf47f19-bd45-42ff-9896-b473fab8d46d.png','ithamar':'exec-1cd47193-8f0c-4f42-aeeb-c3c8635752b4.png','jethro':'exec-17207a02-b31e-4956-907e-b94fa5186537.png'}.items():
    path=target/f'{pid}.png'
    if not path.exists():shutil.copyfile(ROOT.parent.parent/'.codex/generated_images/01a10a34-fef9-7ee2-8415-94d9da51a052'/file,path)
    records[pid]=dict(src=f'assets/portraits/exodus/{pid}.png',credit='AI-generated illustration',license='Generated artwork',licenseUrl='',sourceUrl='',generated=True,description=f'Imaginative artistic depiction of {pid.title()}.',note='An artistic interpretation, not a known likeness.')
records['joseph']=json.loads((OUT/'genesis-art.json').read_text(encoding='utf-8'))['joseph']
for pid in ['nadab','abihu']:records[pid]['note']='This artwork depicts the later Leviticus account. It illustrates the person, not an Exodus event.'
records['eleazar']['note']='This artwork depicts the later Numbers account of Joshua’s appointment. It does not depict an Exodus event.'
(OUT/'exodus-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Saved {len(records)} Exodus portrait records.')
