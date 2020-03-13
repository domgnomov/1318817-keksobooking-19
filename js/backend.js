'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

  var StatusCode = {
    OK: 200
  };

  var statusHandler = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var doRequest = function (url, type, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.requestType = 'multipart/form-data';
    statusHandler(xhr, onLoad, onError);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(type, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    doRequest(LOAD_URL, 'GET', onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    doRequest(SAVE_URL, 'POST', onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
