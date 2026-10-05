const search=document.querySelector('#bookSearch'),filter=document.querySelector('#testament'),groups=document.querySelector('#bookGroups'),status=document.querySelector('#directoryStatus');
try {
  const response=await fetch('data/books/directory.json');
  if(!response.ok)throw new Error('directory');
  const books=await response.json();
  function render(){
    const matches=books.filter(b=>b.name.toLowerCase().includes(search.value.trim().toLowerCase())&&(filter.value==='all'||filter.value===b.testament||(filter.value==='ready'&&b.status==='ready')));
    groups.replaceChildren();
    for(const testament of ['Old Testament','New Testament']){
      const rows=matches.filter(b=>b.testament===testament);if(!rows.length)continue;
      const section=document.createElement('section'),heading=document.createElement('h2'),grid=document.createElement('div');heading.textContent=testament;grid.className='book-grid';section.append(heading,grid);
      for(const book of rows){const card=document.createElement('a');card.className=`book-card ${book.status}`;card.href=book.url;const title=document.createElement('h3'),label=document.createElement('span'),description=document.createElement('p');title.textContent=book.name;label.className='book-status';label.textContent=book.status==='ready'?'Ready to study':'Planned';description.textContent=book.id==='genesis'?'Creation · covenant · family · forgiveness':book.id==='isaiah'?'Prophecy · kingdoms · exile · restoration':'Guide not yet built';card.append(label,title,description);grid.append(card);}
      groups.append(section);
    }
    const ready=books.filter(b=>b.status==='ready').length;status.textContent=`${ready} guides ready · ${books.length-ready} planned · ${matches.length} books shown`;
    if(!matches.length){const p=document.createElement('p');p.textContent='No books match this search.';groups.append(p);}
  }
  search.addEventListener('input',render);filter.addEventListener('change',render);render();
}catch{status.textContent='The book directory could not load. Reload this page.';}
