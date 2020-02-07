'use strict';

(function () {
  var pinTemplateElement = document.querySelector('#pin');
  var mapPinTemplateElement = pinTemplateElement.content.querySelector('.map__pin');

  var mapPinsElement = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');
  var mapFilterElement = document.querySelector('.map__filters-container');
  var mapMainPinButtonElement = mapPinsElement.querySelector('.map__pin--main');

  var mapFormElement = document.querySelector('.map__filters');
  var mapFormFieldsetElement = mapFormElement.querySelectorAll('fieldset');
  var mapFormSelectElement = mapFormElement.querySelectorAll('select');

  var LEFT_MOUSE_BUTTON_CODE = 0;
  var ENTER_KEY = 'Enter';

  var init = function () {
    mapMainPinButtonElement.addEventListener('mousedown', function (evt) {
      if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
        window.engine.activatePage();
      }
    });

    mapMainPinButtonElement.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        window.engine.activatePage();
      }
    });
  };

  var elements = {
    pinTemplateElement: pinTemplateElement,
    mapPinTemplateElement: mapPinTemplateElement,
    mapPinsElement: mapPinsElement,
    mapMainPinButtonElement: mapMainPinButtonElement,
    mapElement: mapElement,
    mapFilterElement: mapFilterElement,
    mapFormElement: mapFormElement,
    mapFormFieldsetElement: mapFormFieldsetElement,
    mapFormSelectElement: mapFormSelectElement

  }

  window.map = {
    init: init,
    elements: elements
  };
})();
