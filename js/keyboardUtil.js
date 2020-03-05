'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_MOUSE_BUTTON_CODE = 0;
  var ENTER_KEY = 'Enter';

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  window.keyboardUtil = {
    leftMouseButtonCode: LEFT_MOUSE_BUTTON_CODE,
    enterKey: ENTER_KEY,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
