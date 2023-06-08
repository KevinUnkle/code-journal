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
const $ul = document.querySelector('ul');

$form.addEventListener('submit', function (event) {
  const newObject = {};
  event.preventDefault();
  newObject.title = $titleForm.value;
  newObject.photoURL = $photoForm.value;
  newObject.notes = $notesForm.value;
  newObject.entryId = data.nextEntryId;
  if (data.editing !== null) { // editing = !==null
    newObject.entryId = data.editing;
    newObject.title = data.editing.title;
    newObject.photoURL = data.editing.photoURL;
    newObject.notes = data.editing.notes;
    newObject.entryId = data.nextEntryId;
    renderEntry(newObject);
    const $li = document.querySelector('li');
    $li.replaceWith(newObject);
    $h1.textContent = 'New Entry';
    data.editing = null;
  } else { // adding new entry, nerd.
    data.nextEntryId++;
    data.entries.unshift(newObject);
    $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
    viewSwap('entries');
    $form.reset();
    $ul.prepend(renderEntry(newObject));
  }
});

function renderEntry(entry) {
  const $newLi = document.createElement('li');
  const $newRowDiv = document.createElement('div');
  const $firstColumnHalf = document.createElement('div');
  const $imageDiv = document.createElement('div');
  const $secondColumnHalf = document.createElement('div');
  const $newImg = document.createElement('img');
  const $newH2 = document.createElement('h2');
  const $newP = document.createElement('p');
  const $fontAwesomeDiv = document.createElement('div');
  const $i = document.createElement('i');
  $newRowDiv.className = 'row';
  $firstColumnHalf.className = 'column-half';
  $secondColumnHalf.className = 'column-half';
  $newImg.setAttribute('src', entry.photoURL);
  $newImg.alt = 'web photo';
  $newLi.append($newRowDiv);
  $newRowDiv.append($firstColumnHalf);
  $i.className = 'fa fa-pencil fa-2x';
  $i.setAttribute('data-entry-id', entry.entryId);
  $firstColumnHalf.appendChild($imageDiv);
  $imageDiv.appendChild($newImg);
  $firstColumnHalf.after($secondColumnHalf);
  $secondColumnHalf.append($fontAwesomeDiv);
  $fontAwesomeDiv.appendChild($newH2);
  $fontAwesomeDiv.appendChild($i);
  $fontAwesomeDiv.className = 'row';
  $fontAwesomeDiv.className = 'row fontawesome';
  $secondColumnHalf.appendChild($newP);
  $newH2.textContent = entry.title;
  $newP.textContent = entry.notes;
  $newLi.setAttribute('data-entry-id', entry.entryId);
  toggleNoEntries();
  return $newLi;
}

const $h1 = document.querySelector('h1');

$ul.addEventListener('click', function (event) {
  viewSwap('entry-form');
  const $dataEntryId = event.target.getAttribute('data-entry-id');
  for (let i = 0; i < data.entries.length; i++) {
    const $dataEntry = data.entries[i];
    if ($dataEntry.entryId === (+$dataEntryId)) {
      data.editing = $dataEntry;
      $titleForm.setAttribute('value', data.editing.title);
      $photoForm.setAttribute('value', data.editing.photoURL);
      $notesForm.textContent = data.editing.notes;
      $h1.textContent = 'Edit Entry';
    }
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = data.entries[i];
    const entryDom = renderEntry(dataEntry);
    $ul.append(entryDom);
    viewSwap(data.view);
    toggleNoEntries();
  }
});
const $div = document.querySelector('#hidden');
function toggleNoEntries() {
  const dataEntries = data.entries;
  if (dataEntries.length === 0) {
    $div.className = '';
  } else {
    $div.className = 'hidden';
  }
}

const $entryForm = document.querySelector('#data-view');
const $entries = document.querySelector('#entries');

function viewSwap(view) {
  data.view = view;
  if (view === 'entry-form') {
    $entryForm.className = '';
    $entries.className = 'hidden';
  } else {
    $entries.className = '';
    $entryForm.className = 'hidden';
  }
}
const $entriesLink = document.querySelector('#entries-link');
$entriesLink.addEventListener('click', function (event) {
  viewSwap('entries');
});

const $newButton = document.querySelector('#new-button');
$newButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
