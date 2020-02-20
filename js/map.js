'use strict';

(function () {
  var pinTemplateElement = document.querySelector('#pin');
  var mapPinElement = pinTemplateElement.content.querySelector('.map__pin');

  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapFilterElement = document.querySelector('.map__filters-container');
  var mapMainPinButtonElement = mapPinsElement.querySelector('.map__pin--main');

  var mapFormElement = document.querySelector('.map__filters');
  var mapFormFieldsetElement = mapFormElement.querySelectorAll('fieldset');
  var mapFormSelectElement = mapFormElement.querySelectorAll('select');
  var housingTypeFormElement = mapFormElement.querySelector('#housing-type');
  var housingPriceFormElement = mapFormElement.querySelector('#housing-price');
  var housingRoomsFormElement = mapFormElement.querySelector('#housing-rooms');
  var housingGuestsFormElement = mapFormElement.querySelector('#housing-guets');

  var LEFT_MOUSE_BUTTON_CODE = 0;
  var ENTER_KEY = 'Enter';

  var onFilterChange = function () {
    window.engine.showFilteredAds();
    clearCards();
  };

  var clearCards = function () {
    var mapCardsElement = mapElement.querySelectorAll('.map__card');
    mapCardsElement.forEach(function (card) {
      mapElement.removeChild(card);
    });
  };

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

    housingTypeFormElement.addEventListener('change', function () {
      onFilterChange();
    });

    housingRoomsFormElement.addEventListener('change', function () {
      onFilterChange();
    });

  };

  var elements = {
    pinTemplateElement: pinTemplateElement,
    mapPinElement: mapPinElement,
    mapPinsElement: mapPinsElement,
    mapMainPinButtonElement: mapMainPinButtonElement,
    mapElement: mapElement,
    mapFilterElement: mapFilterElement,
    mapFormElement: mapFormElement,
    mapFormFieldsetElement: mapFormFieldsetElement,
    mapFormSelectElement: mapFormSelectElement,
    housingTypeFormElement: housingTypeFormElement,
    housingPriceFormElement: housingPriceFormElement,
    housingRoomsFormElement: housingRoomsFormElement,
    housingGuestsFormElement: housingGuestsFormElement
  };

  window.map = {
    init: init,
    elements: elements
  };
})();
