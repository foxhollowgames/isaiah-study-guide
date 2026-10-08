"""Keep connected Acts explanations within the reader's sentence limit."""
from pathlib import Path
p=Path(__file__).parent/'book-context-complete/acts.json'
s=p.read_text(encoding='utf8')
edits={
 'The council still beats the apostles, whose continued teaching shows that release has not removed suffering.':'The council still beats the apostles, whose continued teaching shows that release has not ended suffering.',
 'Saul travels with authority to bind believers, but the encounter leaves him dependent on their help.':'Saul travels with authority to bind believers, but the encounter makes him need their help.',
 "Peter's later care for Aeneas and Tabitha connects expanding witness with restored lives and mourning households.":"Peter's care for Aeneas and Tabitha connects expanding witness with restored lives and mourning households.",
 "In Cornelius' house, he explains the vision through people whom he must no longer call unclean.":"In Cornelius' house, he explains the vision through people he must no longer call unclean.",
 'The account then moves to Antioch, where Barnabas welcomes growth and brings Saul to help teach.':'The account moves to Antioch, where Barnabas welcomes growth and brings Saul to help teach.',
 'Peter initially mistakes his release for a vision and understands it only after reaching the street.':'Peter first mistakes release for a vision and understands it only after reaching the street.',
 "Herod's later death contrasts his accepted praise as a god with the continuing growth of God's word.":"Herod's death contrasts praise accepted as a god with the continuing growth of God's word.",
 'In Pisidian Antioch, an invitation after Scripture reading gives Paul room to connect promises with resurrection.':'In Pisidian Antioch, an invitation after Scripture reading lets Paul connect promises with resurrection.',
 'Many Jews and other worshipers follow, but the next crowd brings opposition from other local Jews.':'Many Jews and other worshipers follow, but the next crowd brings opposition from other Jews.',
 'Tearing their clothes, the teachers identify themselves as ordinary people who point toward the living Creator.':'Tearing their clothes, the teachers call themselves ordinary people who point toward the living Creator.',
 'James connects their account with the prophets and proposes limited instructions rather than the disputed burden.':'James connects their account with the prophets and proposes limited instructions instead of that burden.',
 'A later argument about Mark separates Paul and Barnabas, showing that agreement does not end every dispute.':'A later argument about Mark separates Paul and Barnabas, showing agreement does not end every dispute.',
 "Paul prevents the jailer's suicide by confirming that everyone remains, joining rescue with teaching and care.":"Paul prevents the jailer's suicide by confirming everyone remains, joining rescue with teaching and care.",
 'Many gathered people do not know why they have come, although they repeat the same shout.':'Many gathered people do not know why they came, although they repeat the same shout.',
 'His later offer of Jerusalem prompts Paul to appeal to Caesar rather than accept a transfer.':'His offer of Jerusalem prompts Paul to appeal to Caesar rather than accept a transfer.',
 'The rulers judge him undeserving of death while recognizing that his appeal now controls the case.':'The rulers judge him undeserving of death while recognizing his appeal now controls the case.',
 'Soldiers then propose killing prisoners to prevent escape, but the centurion stops them to protect Paul.':'Soldiers propose killing prisoners to prevent escape, but the centurion stops them to protect Paul.',
 "Malta's welcome contrasts with rapid judgments that call Paul first a murderer and then a god.":"Malta's welcome contrasts with judgments that call Paul first a murderer and then a god.",
 'It closes with two years of welcome and bold teaching, making the continuing message its final emphasis.':'Two years of welcome and bold teaching make the continuing message the ending’s emphasis.'}
for a,b in edits.items():s=s.replace(a,b)
p.write_text(s,encoding='utf8')
