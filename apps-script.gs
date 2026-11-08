/**
 * Приём ответов «Проверьте себя за минуту» с сайта-визитки.
 * 1) Создайте Google Таблицу, в ней: Расширения → Apps Script, вставьте этот код.
 * 2) Развернуть → Новое развёртывание → Веб-приложение:
 *    «Выполнять от имени: меня», «Доступ: все». Скопируйте адрес …/exec.
 * 3) Вставьте адрес в сайт: в index.html строка  var ENDPOINT='';
 * Персональных данных не собираем: только ответы «знаю / не знаю», код и источник перехода.
 */
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sh = SpreadsheetApp.getActive().getSheetByName('Ответы') || SpreadsheetApp.getActive().insertSheet('Ответы');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Когда', 'Код', 'Без ответа', 'Откуда пришёл', 'Страница'].concat(d.answers.map(function (a) { return a.q; })));
  }
  sh.appendRow([new Date(), d.code, d.unknown, d.from, d.page].concat(d.answers.map(function (a) { return a.know ? 'знаю' : 'надо выяснять'; })));
  return ContentService.createTextOutput('ok');
}
