'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT_WITHOUT_POINTER = 65;
  var PIN_POINTER_HEIGHT = 10;
  var PIN_HEIGHT_WITH_POINTER = PIN_HEIGHT_WITHOUT_POINTER + PIN_POINTER_HEIGHT;

  var MIN_Y = 130 + PIN_HEIGHT_WITH_POINTER;
  var MAX_Y = 630 - PIN_HEIGHT_WITH_POINTER;
  var MIN_X = PIN_WIDTH / 2;
  var MAX_X = window.map.elements.mapPinsElement.offsetWidth - (PIN_WIDTH / 2);

  var disableElements = function (elements) {
    elements.forEach(function (element) {
      element.disabled = true;
    });
  };

  var enableElements = function (elements) {
    elements.forEach(function (element) {
      element.disabled = false;
    });
  };

  var setAddress = function (xShift, yShift) {
    window.form.elements.formAddressElement.readOnly = true;
    var x = Math.round(1 * (window.map.elements.mapMainPinButtonElement.style.left.replace('px', '')) + xShift);
    var y = Math.round(1 * (window.map.elements.mapMainPinButtonElement.style.top.replace('px', '')) + yShift);
    window.form.elements.formAddressElement.value = x + ', ' + y;
  };

  var deactivatePage = function () {
    disableElements(window.form.elements.formFieldsetElement);
    window.form.elements.formElement.classList.add('ad-form--disabled');
    disableElements(window.map.elements.mapFormFieldsetElement);
    disableElements(window.map.elements.mapFormSelectElement);
    window.map.elements.mapElement.classList.add('map--faded');
    setAddress(PIN_WIDTH / 2, PIN_HEIGHT_WITHOUT_POINTER / 2);
  };

  var activatePage = function () {
    enableElements(window.form.elements.formFieldsetElement);
    window.form.elements.formElement.classList.remove('ad-form--disabled');
    enableElements(window.map.elements.mapFormFieldsetElement);
    enableElements(window.map.elements.mapFormSelectElement);
    window.map.elements.mapElement.classList.remove('map--faded');
    setAddress(PIN_WIDTH / 2, PIN_HEIGHT_WITH_POINTER);
  };

  var showAdElementArray = function (ads) {
    window.map.elements.mapPinsElement.appendChild(window.adFactory.generateAdElementArray(ads));
  };

  var activateElements = function () {
    var ads = window.backend.load(showAdElementArray, window.backend.errorHandler);

    // Показ одного объявления, поменять 0 на 1
    var cards = window.card.generateCardElementArray(ads, 0);
    window.map.elements.mapElement.insertBefore(cards, window.map.elements.mapFilterElement);
  };

  var elements = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT_WITHOUT_POINTER: PIN_HEIGHT_WITHOUT_POINTER,
    PIN_POINTER_HEIGHT: PIN_POINTER_HEIGHT,
    PIN_HEIGHT_WITH_POINTER: PIN_HEIGHT_WITH_POINTER,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_X: MIN_X,
    MAX_X: MAX_X
  };

  window.engine = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
    activateElements: activateElements,
    elements: elements
  };
})();
