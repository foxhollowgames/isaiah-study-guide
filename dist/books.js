const bookArtwork={
  "genesis": "genesis/zilpah.png",
  "exodus": "exodus/jethro.png",
  "leviticus": "leviticus/shelomith.png",
  "numbers": "numbers/balak.png",
  "deuteronomy": "exodus/jethro.png",
  "joshua": "joshua/othniel.png",
  "judges": "judges/shamgar.png",
  "ruth": "ruth/ruth.png",
  "1-samuel": "1-samuel/samuel-generated.png",
  "2-samuel": "2-samuel/david.png",
  "1-kings": "1-kings/solomon.png",
  "2-kings": "hezekiah-v2.png",
  "1-chronicles": "david-v2.png",
  "2-chronicles": "1-kings/solomon.png",
  "ezra": "ezra/ezra.png",
  "nehemiah": "nehemiah/nehemiah.png",
  "esther": "esther/esther.png",
  "job": "job/job.png",
  "psalms": "david-v2.png",
  "proverbs": "proverbs/capable-woman-proverbs.png",
  "ecclesiastes": "ecclesiastes/closing-writer-ecclesiastes.png",
  "song-of-solomon": "song-of-solomon/woman-song.png",
  "isaiah": "isaiah-v2.png",
  "jeremiah": "2-chronicles/jeremiah.png"
};
const search=document.querySelector('#bookSearch'),filter=document.querySelector('#testament'),groups=document.querySelector('#bookGroups'),status=document.querySelector('#directoryStatus');
try {
  const response=await fetch('data/books/directory.json',{cache:'no-store'});
  if(!response.ok)throw new Error('directory');
  const books=await response.json();
  function render(){
    const matches=books.filter(b=>b.name.toLowerCase().includes(search.value.trim().toLowerCase())&&(filter.value==='all'||filter.value===b.testament||(filter.value==='ready'&&b.status==='ready')));
    groups.replaceChildren();
    for(const testament of ['Old Testament','New Testament']){
      const rows=matches.filter(b=>b.testament===testament);if(!rows.length)continue;
      const section=document.createElement('section'),heading=document.createElement('h2'),grid=document.createElement('div');heading.textContent=testament;grid.className='book-grid';section.append(heading,grid);
      for(const book of rows){
        const card=document.createElement('a');
        card.className=`book-card ${book.status}`;
        card.href=book.url;
        const artwork=book.status==='ready'&&bookArtwork[book.id];
        if(artwork){
          const image=document.createElement('img');
          image.src=`assets/portraits/${artwork}`;
          image.alt='';
          image.loading='lazy';
          image.decoding='async';
          card.classList.add('has-artwork');
          card.append(image);
        }
        if(book.status!=='ready'){
          const label=document.createElement('span');
          label.className='book-status';
          label.textContent='Planned';
          card.append(label);
        }
        const title=document.createElement('h3');
        title.textContent=book.name;
        card.append(title);
        grid.append(card);
      }
      groups.append(section);
    }
    const ready=books.filter(b=>b.status==='ready').length;status.textContent=`${ready} guides ready · ${books.length-ready} planned · ${matches.length} books shown`;
    if(!matches.length){const p=document.createElement('p');p.textContent='No books match this search.';groups.append(p);}
  }
  search.addEventListener('input',render);filter.addEventListener('change',render);render();
}catch{status.textContent='The book directory could not load. Reload this page.';}
