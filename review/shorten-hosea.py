from pathlib import Path
p=Path('scripts/book-context-complete/hosea.json')
t=p.read_text(encoding='utf8')
changes={
"Each child's name announces a widening loss, from royal judgment to withdrawn mercy and belonging.":"The names announce widening loss, from royal judgment to withdrawn mercy and belonging.",
"This change prevents the children's painful names from becoming the book's last word about their people.":"The promise prevents these painful names from becoming the last word about their people.",
"Hosea receives a command to love a woman despite unfaithfulness, reflecting God's love for Israel.":"Hosea must love an unfaithful woman, reflecting God's love for Israel.",
"Hosea's words require a waiting period without another partner and place a restriction on himself.":"Hosea requires a waiting period without another partner and also restricts himself.",
"Israel's cry that it knows God stands beside accusations of broken law and rejected goodness.":"Israel claims to know God while facing accusations of broken law and rejected goodness.",
"Calling the calf a craftsman's work exposes the difference between a manufactured object and God.":"Naming the calf's craftsman exposes the difference between a manufactured object and God.",
"More altars do not solve the problem because sacrifice continues beside disregard for God's instruction.":"More altars cannot help while sacrifice continues beside disregard for God's instruction.",
"The speech interrupts celebration with warnings that grain and wine will no longer sustain the people.":"The speech interrupts celebration by warning that grain and wine will no longer sustain them.",
"The lion's roar now summons trembling return, reversing the earlier use of animals for destructive power.":"The lion's roar summons trembling return, reversing earlier animal pictures of destructive power.",
"The past becomes a demand for changed conduct, rather than proof that present wealth secures favor.":"The past demands changed conduct, rather than proving that present wealth secures favor.",
"The chapter describes Ephraim's former standing giving way to wrongdoing through Baal and crafted images.":"Ephraim's former standing gives way to wrongdoing through Baal and crafted images.",
"Words about death remain beside withdrawn compassion and terrible violence, so the chapter offers no easy reassurance.":"Words about death remain beside withdrawn compassion and terrible violence, offering no easy reassurance.",
"The final call tells Israel to return with words that ask forgiveness and reject false help.":"Israel must return with words that ask forgiveness and reject false help."
}
for old,new in changes.items():
 assert old in t
 t=t.replace(old,new)
p.write_text(t,encoding='utf8')
