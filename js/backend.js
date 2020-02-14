'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

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

  var doRequest = function (url, requestType, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    statusHandler(xhr, onLoad, onError);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(requestType, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    doRequest('https://js.dump.academy/keksobooking/data','GET', onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    doRequest('https://js.dump.academy/keksobooking','POST', onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
