const bookArtwork={
  "genesis": "genesis/zilpah.png",
  "exodus": "exodus/jethro.png",
  "leviticus": "leviticus/shelomith.png",
  "numbers": "numbers/balak.png",
  "deuteronomy": "exodus/ithamar.png",
  "joshua": "joshua/othniel.png",
  "judges": "judges/shamgar.png",
  "ruth": "ruth/ruth.png",
  "1-samuel": "1-samuel/samuel-generated.png",
  "2-samuel": "2-samuel/david.png",
  "1-kings": "1-kings/solomon.png",
  "2-kings": "hezekiah-v2.png",
  "1-chronicles": "david-v2.png",
  "2-chronicles": "uzziah-v2.png",
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
const groups=document.querySelector('#bookGroups'),status=document.querySelector('#directoryStatus');
try {
  const response=await fetch('data/books/directory.json',{cache:'no-store'});
  if(!response.ok)throw new Error('directory');
  const books=await response.json();
  function render(){
    groups.replaceChildren();
    for(const testament of ['Old Testament','New Testament']){
      const rows=books.filter(b=>b.testament===testament);if(!rows.length)continue;
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

  }
  render();
}catch{status.hidden=false;status.textContent='The book directory could not load. Reload this page.';}
