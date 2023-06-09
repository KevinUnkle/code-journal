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
  event.preventDefault();
  const newObject = {};
  newObject.title = $titleForm.value;
  newObject.photoURL = $photoForm.value;
  newObject.notes = $notesForm.value;
  if (data.editing === null) {
    newObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObject);
    $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
    $ul.prepend(renderEntry(newObject));
  } else {
    newObject.entryId = data.editing.entryId;
    const $liAll = document.querySelectorAll('li');
    const $newRenderObject = renderEntry(newObject);
    for (let i = 0; i < $liAll.length; i++) {
      const $liGetAttribute = $liAll[i].getAttribute('data-entry-id');
      if (+$liGetAttribute === (+data.editing.entryId)) {
        $liAll[i].replaceWith($newRenderObject);
      }
    }
    for (let i = 0; i < data.entries.length; i++) {
      const dataEntriesIndex = data.entries[i];
      if (dataEntriesIndex.entryId === (+data.editing.entryId)) {
        data.entries[i] = newObject;
      }
    }
    $h1.textContent = 'New Entry';
    data.editing = null;
  }
  viewSwap('entries');
  $form.reset();
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
  $firstColumnHalf.appendChild($imageDiv);
  $imageDiv.appendChild($newImg);
  $firstColumnHalf.after($secondColumnHalf);
  $secondColumnHalf.append($fontAwesomeDiv);
  $fontAwesomeDiv.appendChild($newH2);
  $fontAwesomeDiv.appendChild($i);
  $secondColumnHalf.appendChild($newP);
  $fontAwesomeDiv.className = 'row';
  $fontAwesomeDiv.className = 'row fontawesome';
  $i.className = 'fa fa-pencil fa-2x';
  $i.setAttribute('data-entry-id', entry.entryId);
  $newH2.textContent = entry.title;
  $newP.textContent = entry.notes;
  $newLi.setAttribute('data-entry-id', entry.entryId);
  toggleNoEntries();
  return $newLi;
}

const $h1 = document.querySelector('h1');
const $deleteButton = document.querySelector('#delete');

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
  if (data.editing !== null) {
    $deleteButton.className = 'delete';
  } else {
    $deleteButton.className = 'hidden';
  }
});

const $modal = document.querySelector('#modal');
const $overlay = document.querySelector('#overlay');

$deleteButton.addEventListener('click', function (event) {
  viewSwap('#modal');
  $modal.className = 'modal';
  $overlay.className = 'overlay';
});

const $cancel = document.querySelector('#cancel');
const $confirm = document.querySelector('#confirm');

$cancel.addEventListener('click', function (event) {
  $modal.className = 'hidden';
  $overlay.className = 'hidden';
});

$confirm.addEventListener('click', function (event) {
  const $li = document.querySelectorAll('li');
  for (let i = 0; i < data.entries.length; i++) {
    const $dataEntriesI = data.entries[i];
    if ($dataEntriesI === data.editing) {
      data.entries.splice(i, 1);
      for (let i = 0; i < $li.length; i++) {
        const $liGetAttribute = $li[i].getAttribute('data-entry-id');
        if (+$liGetAttribute === (+data.editing.entryId)) {
          $li[i].remove();
        }
      }
      toggleNoEntries();
      $modal.className = 'hidden';
      $overlay.className = 'hidden';
      viewSwap('entries');
    }
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = data.entries[i];
    const entryDom = renderEntry(dataEntry);
    $ul.append(entryDom);
  }
  viewSwap('entry-form');
  toggleNoEntries();
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
