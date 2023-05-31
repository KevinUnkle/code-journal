/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const $data = JSON.stringify(data);
  localStorage.setItem('data', $data);
});

if (localStorage.getItem('data') !== null) {
  const $finalData = localStorage.getItem('data');
  const $parsedData = JSON.parse($finalData);
  data = $parsedData;
}
