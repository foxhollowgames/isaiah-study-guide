"""Persistent sentence edits made after reading the authored Luke paragraphs."""
import json
from book_common import ROOT
p=ROOT/'scripts/book-context-complete/luke.json'
rows=json.loads(p.read_text(encoding='utf8'))
changes={
7:("Her tears, kisses, and ointment expose the host's missing care without giving her another woman's name.","Her tears, kisses, and ointment expose missing care without assigning her another woman's name."),
8:("Named women help sustain the traveling group from their possessions before Jesus explains the seed story.","Named women sustain the traveling group from their possessions before Jesus explains the seed story."),
9:("Jesus rebukes the proposed fire, making the journey's purpose different from the disciples' desire for destruction.","Jesus rebukes the proposed fire, separating the journey's purpose from the disciples' desire for destruction."),
11:("Disputes about release from demons lead Jesus to reject the claim that divided evil explains it.","Jesus rejects the claim that divided evil explains his work of release from demons."),
12:("Peter's question leads to another servant who must distribute food rather than exploit a delayed return.","Peter's question introduces another servant who must distribute food rather than exploit a delayed return."),
13:("The final grief over Jerusalem joins refused gathering with the city's danger rather than easy triumph.","Grief over Jerusalem joins refused gathering with the city's danger rather than easy triumph."),
15:("A shepherd and a woman each invite others to share joy after recovering what was lost.","A shepherd and a woman invite others to share joy after recovering what was lost."),
16:("Malcolm reads the reversed fortunes through neglected poverty, while Abraham's final answer demands hearing existing warnings.","Malcolm connects reversed fortunes with neglected poverty, while Abraham's final answer demands hearing existing warnings."),
17:("Later warnings about sudden judgment resist claims that a predictable location or ordinary routine guarantees safety.","Later warnings about sudden judgment deny that a predictable location or ordinary routine guarantees safety."),
18:("The unjust judge grants help from annoyance, so the comparison does not make God similarly unjust.","The unjust judge grants help from annoyance, but the comparison does not make God unjust."),
19:("Jesus' entry then receives royal praise beside his tears over the city's missed opportunity for peace.","Jesus' entry receives royal praise beside his tears over the city's missed opportunity for peace."),
22:("At arrest, Jesus heals the damaged ear, while Peter later denies him and remembers his words.","At arrest, Jesus heals the damaged ear, while Peter denies him and remembers his words."),
23:("Joseph's refusal to consent and the women's care prevent the account from treating everyone as identical.","Joseph's refusal and the women's care prevent the account from treating everyone as identical.")}
for r in rows:
 if r[0] in changes:r[3]=r[3].replace(*changes[r[0]])
 if r[0]==8:r[3]=r[3].replace('receives a task to tell his household','must tell his household')
 if r[0]==15:r[3]=r[3].replace('names the returned man as his brother','names the returned man his brother')
 if r[0]==18:
  r[3]=r[3].replace('asks for mercy without defending himself','asks for mercy without defense').replace('from accepting the demand to follow','from accepting the call to follow')
p.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
