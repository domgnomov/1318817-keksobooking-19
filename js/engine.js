'use strict';

(function () {
  var isPageActivated = false;

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

  var setAddress = function () {
    var xShift = window.map.mainPinWidth / 2;
    var yShift = window.map.mainPinHeight;
    if (!isPageActivated) {
      yShift = yShift / 2;
    }
    var x = Math.round(1 * (window.map.elements.mapMainPinButtonElement.style.left.replace('px', '')) + xShift);
    var y = Math.round(1 * (window.map.elements.mapMainPinButtonElement.style.top.replace('px', '')) + yShift);
    window.form.elements.formAddressElement.value = x + ', ' + y;
  };

  var deactivatePage = function () {
    isPageActivated = false;
    window.card.closeAllCardElements();
    disableElements(window.form.elements.formFieldsetElements);
    window.form.elements.formElement.reset();
    window.form.elements.formElement.classList.add('ad-form--disabled');
    disableElements(window.map.elements.mapFormFieldsetElements);
    disableElements(window.map.elements.mapFormSelectElements);
    window.map.elements.mapElement.classList.add('map--faded');
    window.data.clearAds();
    window.map.clearFilters();
    window.map.clearCheckboxes();
    window.mapPinMoving.setDefaultPosition();
    setAddress();
  };

  var activatePage = function () {
    if (isPageActivated) {
      return;
    }
    isPageActivated = true;
    enableElements(window.form.elements.formFieldsetElements);
    window.form.elements.formElement.classList.remove('ad-form--disabled');
    activateElements();
    setAddress();
  };

  var showFilteredAds = function () {
    window.map.elements.mapPinsElement.appendChild(window.data.getAdElements(window.data.getFilteredAds()));
  };

  var showBaseAds = function (ads) {
    window.data.initAds(ads);
    window.map.elements.mapPinsElement.appendChild(window.data.getAdElements(window.data.getInitialAds()));
    window.map.elements.mapElement.classList.remove('map--faded');
    enableElements(window.map.elements.mapFormFieldsetElements);
    enableElements(window.map.elements.mapFormSelectElements);
  };

  var activateElements = function () {
    window.backend.load(showBaseAds, window.dialog.showErrorDialog);
  };

  window.engine = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
    activateElements: activateElements,
    showFilteredAds: showFilteredAds,
    setAddress: setAddress,
    isPageActivated: isPageActivated
  };
})();
