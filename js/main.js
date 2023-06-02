const photoURL = document.querySelector('#photo-url');
const $imgSrc = document.querySelector('.url-pic');

photoURL.addEventListener('input', function (event) {
  const urlValue = photoURL.value;
  $imgSrc.setAttribute('src', urlValue);
});

const $titleForm = document.querySelector('#title');
const $photoForm = document.querySelector('#photo-url');
const $notesForm = document.querySelector('#notes');
const $form = document.querySelector('#form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const newObject = {};
  newObject.title = $titleForm.value;
  newObject.photoURL = $photoForm.value;
  newObject.notes = $notesForm.value;
  newObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newObject);
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  renderEntry();
});

function renderEntry(entry) {
  const newLi = document.createElement('li');
  const newDiv = document.createElement('div');
  const newImg = document.createElement('img');
  const newH2 = document.createElement('h2');
  const newP = document.createElement('p');
  newDiv.className = 'container';
  newImg.setAttribute('src', entry.photoURL);
  newLi.append(newDiv);
  newDiv.append(newImg);
  newImg.after(newH2);
  newH2.after(newP);
  newH2.textContent = entry.title;
  newP.textContent = entry.notes;
  return newLi;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = data.entries[i];
    const entryDom = renderEntry(dataEntry);
    const $ul = document.querySelector('ul');
    $ul.append(entryDom);
  }
});

// function toggleNoEntries() {
//   const $div = document.querySelector('#hidden');
//   const dataEntries = data.entries;
//   if (dataEntries.length === 0) {
//     $div.className = '';
//   } else {
//     $div.className = 'hidden';
//   }
// }

function viewSwap(view) {
  const $entryForm = document.querySelector('#data-view');
  const $entries = document.querySelector('#entries');
  data.view = view;
  if (view === 'entry-form') {
    $entryForm.className = '';
    $entries.className = 'hidden';
  } else {
    $entries.className = '';
    $entryForm.className = 'hidden';
  }
}
const $entriesLink = document.querySelector('#entriesLink');
$entriesLink.addEventListener('click', function (event) {
  viewSwap('entries');

});
