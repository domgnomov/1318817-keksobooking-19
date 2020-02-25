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
  var mapFormHousingTypeElement = mapFormElement.querySelector('#housing-type');
  var mapFormHousingPriceElement = mapFormElement.querySelector('#housing-price');
  var mapFormHousingRoomsElement = mapFormElement.querySelector('#housing-rooms');
  var mapFormHousingGuestsElement = mapFormElement.querySelector('#housing-guests');

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
    mapMainPinButtonElement.focus();
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

    mapFormHousingTypeElement.addEventListener('change', function () {
      onFilterChange();
    });

    mapFormHousingPriceElement.addEventListener('change', function () {
      onFilterChange();
    });

    mapFormHousingRoomsElement.addEventListener('change', function () {
      onFilterChange();
    });

    mapFormHousingGuestsElement.addEventListener('change', function () {
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
    mapFormHousingTypeElement: mapFormHousingTypeElement,
    mapFormHousingPriceElement: mapFormHousingPriceElement,
    mapFormHousingRoomsElement: mapFormHousingRoomsElement,
    mapFormHousingGuestsElement: mapFormHousingGuestsElement
  };

  window.map = {
    init: init,
    elements: elements
  };
})();
