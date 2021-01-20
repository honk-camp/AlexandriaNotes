const notes = localStorage.getItem('notes') || [];

const resultsEl = document.getElementById('results');
const searchEl = document.getElementById('search');

const noteTitleEl = document.getElementById('note-title');
const noteContentEl = document.getElementById('note-content');

const addNoteEl = document.getElementById('add-note');

let currentNote;

const generateResults = (term = searchEl.value) => {
  localStorage.setItem('notes', notes);

  resultsEl.innerHTML = '';

  const fuzzyRegex = new RegExp(term.toLowerCase().split('').join('.*'));

  for (const n of notes.filter((x) => x.content.toLowerCase().match(fuzzyRegex) || x.title.toLowerCase().match(fuzzyRegex))) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    const titleEl = document.createElement('div');
    titleEl.textContent = n.title;

    const deleteEl = document.createElement('div');
    deleteEl.textContent = '🗑️';
    
    titleEl.appendChild(deleteEl);

    deleteEl.onclick = () => {
      notes.splice(notes.indexOf(n), 1);
      generateResults();
    };

    cardEl.onclick = () => {
      showNote(n);
    };

    const contentEl = document.createElement('div');
    contentEl.textContent = `${n.content.substring(0, 40)}...`;

    cardEl.appendChild(titleEl);
    cardEl.appendChild(contentEl);
    
    resultsEl.appendChild(cardEl);
  }
};

const showNote = (note) => {
  currentNote = note;

  noteTitleEl.textContent = note.title;
  noteContentEl.textContent = note.content;
};

generateResults();

searchEl.oninput = () => {
  generateResults();
};

addNoteEl.onclick = () => {
  const title = prompt(`Enter note title:`);
  
  const newNote = {
    title,
    content: ''
  };

  notes.push(newNote);

  showNote(newNote);

  generateResults();
};

noteTitleEl.oninput = () => {
  currentNote.title = noteTitleEl.innerText;

  generateResults();
};

noteContentEl.oninput = () => {
  currentNote.content = noteContentEl.innerText;

  generateResults();
};