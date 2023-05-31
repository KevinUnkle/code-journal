const $photoURL = document.querySelector('#photo-url');

$photoURL.addEventListener('input', function (event) {
  const $urlValue = $photoURL.value;
  const $imgSrc = document.querySelector('.url-pic');
  $imgSrc.setAttribute('src', $urlValue);
});

const $form = document.querySelector('#form');
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const newObject = {};
  const $titleForm = document.querySelector('#title');
  const $photoForm = document.querySelector('#photo-url');
  const $notesForm = document.querySelector('#notes');
  newObject.$titleForm = $titleForm.value;
  newObject.$photoForm = $photoForm.value;
  newObject.$notesForm = $notesForm.value;
  newObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(newObject);
  const $imgSrc = document.querySelector('.url-pic');
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
