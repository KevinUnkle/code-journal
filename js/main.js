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
});
