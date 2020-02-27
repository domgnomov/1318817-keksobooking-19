'use strict';

(function () {
  var MIN_PIN_Y_VALUE = 130;
  var MAX_PIN_Y_VALUE = 630;

  var defaultPositionTop;
  var defaultPositionLeft;

  var mainPinElement = window.map.elements.mapMainPinButtonElement;

  var minX = -window.map.mainPinWidth / 2;
  var maxX = -window.map.mainPinWidth / 2 + window.map.mapWidth;
  var minY = MIN_PIN_Y_VALUE - window.map.mainPinHeight;
  var maxY = MAX_PIN_Y_VALUE - window.map.mainPinHeight;

  var init = function () {
    defaultPositionTop = mainPinElement.offsetTop + 'px';
    defaultPositionLeft = mainPinElement.offsetLeft + 'px';

    mainPinElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var newTopValue = mainPinElement.offsetTop - shift.y;
        if (newTopValue >= minY && newTopValue <= maxY) {
          mainPinElement.style.top = newTopValue + 'px';
        }

        var newLeftValue = mainPinElement.offsetLeft - shift.x;
        if (newLeftValue >= minX && newLeftValue <= maxX) {
          mainPinElement.style.left = newLeftValue + 'px';
        }

        window.engine.setAddress();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mainPinElement.removeEventListener('click', onClickPreventDefault);
          };
          mainPinElement.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };

  var setDefaultPosition = function () {
    mainPinElement.style.top = defaultPositionTop;
    mainPinElement.style.left = defaultPositionLeft;
  };

  window.mapPinMoving = {
    init: init,
    setDefaultPosition: setDefaultPosition
  };

})();
