'use strict';

(function () {
  var mapPinElement = window.map.elements.mapMainPinButtonElement;
  var defaultPositionTop;
  var defaultPositionLeft;
  console.log('ENTER - defaultPositionTop - ' + defaultPositionTop + ', defaultPositionLeft - ' + defaultPositionLeft);

  var init = function () {
    defaultPositionTop = mapPinElement.offsetTop + 'px';
    defaultPositionLeft = mapPinElement.offsetLeft + 'px';

    mapPinElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      console.log('mousedown - startCoords x - ' + startCoords.x + ', y - ' + startCoords.y);
      console.log('mousedown - defaultPositionTop - ' + defaultPositionTop + ', defaultPositionLeft - ' + defaultPositionLeft);

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        console.log('onMouseMove - startCoords x - ' + startCoords.x + ', y - ' + startCoords.y);
        console.log('onMouseMove - defaultPositionTop - ' + defaultPositionTop + ', defaultPositionLeft - ' + defaultPositionLeft);

        checkCoordinatekRestriction();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinElement.style.top = (mapPinElement.offsetTop - shift.y) + 'px';
        mapPinElement.style.left = (mapPinElement.offsetLeft - shift.x) + 'px';

        window.engine.setAddress();

        console.log('onMouseMove - mapPinElement.offsetTop - ' + mapPinElement.offsetTop + ', mapPinElement.offsetLeft - ' + mapPinElement.offsetLeft);
        console.log('onMouseMove - mapPinElement.style.top - ' + mapPinElement.style.top + ', mapPinElement.style.left - ' + mapPinElement.style.left);
      };

      var checkCoordinatekRestriction = function () {

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mapPinElement.removeEventListener('click', onClickPreventDefault);
          };
          mapPinElement.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };

  var setDefaultPosition = function () {
    console.log('setDefaultPosition - defaultPositionTop - ' + defaultPositionTop + ', defaultPositionLeft - ' + defaultPositionLeft);
    mapPinElement.style.top = defaultPositionTop;
    mapPinElement.style.left = defaultPositionLeft;
    console.log('setDefaultPosition - mapPinElement.style.top - ' + mapPinElement.style.top + ', mapPinElement.style.left - ' + mapPinElement.style.left);

  };

  window.mapPinMoving = {
    init: init,
    setDefaultPosition: setDefaultPosition
  };

})();
