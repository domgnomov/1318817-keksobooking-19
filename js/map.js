'use strict';

(function () {
  var pinTemplateElement = document.querySelector('#pin');
  var mapPinElement = pinTemplateElement.content.querySelector('.map__pin');

  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapNotMainPinsElements = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mapFilterElement = document.querySelector('.map__filters-container');
  var mapMainPinButtonElement = mapPinsElement.querySelector('.map__pin--main');

  var mapFormElement = document.querySelector('.map__filters');
  var mapFormAllFiltersElements = mapFormElement.querySelectorAll('.map__filter');
  var mapFormAllCheckboxElements = mapFormElement.querySelectorAll('.map__checkbox');
  var mapFormFieldsetElements = mapFormElement.querySelectorAll('fieldset');
  var mapFormSelectElements = mapFormElement.querySelectorAll('select');
  var mapFormHousingTypeElement = mapFormElement.querySelector('#housing-type');
  var mapFormHousingPriceElement = mapFormElement.querySelector('#housing-price');
  var mapFormHousingRoomsElement = mapFormElement.querySelector('#housing-rooms');
  var mapFormHousingGuestsElement = mapFormElement.querySelector('#housing-guests');
  var mapFormWifiElement = mapFormElement.querySelector('#filter-wifi');
  var mapFormDishwasherElement = mapFormElement.querySelector('#filter-dishwasher');
  var mapFormParkingElement = mapFormElement.querySelector('#filter-parking');
  var mapFormWasherElement = mapFormElement.querySelector('#filter-washer');
  var mapFormElevatorElement = mapFormElement.querySelector('#filter-elevator');
  var mapFormConditionerElement = mapFormElement.querySelector('#filter-conditioner');

  var mapWidth = mapElement.offsetWidth;
  var mainPinWidth = mapMainPinButtonElement.offsetWidth;
  var mainPinHeight = mapMainPinButtonElement.offsetHeight;

  var onFilterChange = function () {
    window.engine.showFilteredAds();
    clearCards();
  };

  var clearCards = function () {
    var mapCardsElements = mapElement.querySelectorAll('.map__card');
    mapCardsElements.forEach(function (card) {
      mapElement.removeChild(card);
    });
  };

  var clearFilters = function () {
    mapFormAllFiltersElements.forEach(function (element) {
      element.value = window.filter.typeAny;
    });
  };

  var clearCheckboxes = function () {
    mapFormAllCheckboxElements.forEach(function (element) {
      element.checked = false;
    });
  };

  var init = function () {
    mapMainPinButtonElement.focus();
    mapMainPinButtonElement.addEventListener('mousedown', function (evt) {
      if (evt.button === window.keyboardUtil.leftMouseButtonCode && !window.engine.isPageActivated) {
        window.engine.activatePage();
      }
    });

    mapMainPinButtonElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.keyboardUtil.enterKey && !window.engine.isPageActivated) {
        window.engine.activatePage();
      }
    });

    var debounce = window.debounce(onFilterChange);

    mapFormAllFiltersElements.forEach(function (element) {
      element.addEventListener('change', function () {
        debounce();
      });
    });

    mapFormAllCheckboxElements.forEach(function (element) {
      element.addEventListener('change', function () {
        debounce();
      });
    });

  };

  var elements = {
    pinTemplateElement: pinTemplateElement,
    mapPinElement: mapPinElement,
    mapPinsElement: mapPinsElement,
    mapNotMainPinsElements: mapNotMainPinsElements,
    mapMainPinButtonElement: mapMainPinButtonElement,
    mapElement: mapElement,
    mapFilterElement: mapFilterElement,
    mapFormElement: mapFormElement,
    mapFormFieldsetElements: mapFormFieldsetElements,
    mapFormSelectElements: mapFormSelectElements,
    mapFormHousingTypeElement: mapFormHousingTypeElement,
    mapFormHousingPriceElement: mapFormHousingPriceElement,
    mapFormHousingRoomsElement: mapFormHousingRoomsElement,
    mapFormHousingGuestsElement: mapFormHousingGuestsElement,
    mapFormWifiElement: mapFormWifiElement,
    mapFormDishwasherElement: mapFormDishwasherElement,
    mapFormParkingElement: mapFormParkingElement,
    mapFormWasherElement: mapFormWasherElement,
    mapFormElevatorElement: mapFormElevatorElement,
    mapFormConditionerElement: mapFormConditionerElement
  };

  window.map = {
    init: init,
    clearFilters: clearFilters,
    clearCheckboxes: clearCheckboxes,
    elements: elements,
    mapWidth: mapWidth,
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight
  };
})();
