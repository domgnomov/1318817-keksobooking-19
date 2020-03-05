'use strict';

(function () {
  var NOT_FOR_GUESTS_VALUE = '0';
  var ONE_HUNDRED_ROOMS_VALUE = '100';

  var MAX_PRICE = 1000000;

  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;

  var HousingMinPriceByType = {
    bungalo: BUNGALO_MIN_PRICE,
    flat: FLAT_MIN_PRICE,
    house: HOUSE_MIN_PRICE,
    palace: PALACE_MIN_PRICE
  };

  var formElement = document.querySelector('.ad-form');
  var formCapacityElement = formElement.querySelector('#capacity');
  var formRoomNumberElement = formElement.querySelector('#room_number');
  var formFieldsetElements = formElement.querySelectorAll('fieldset');
  var formAddressElement = formElement.querySelector('#address');
  var formHousingTypeElement = formElement.querySelector('#type');
  var formHousingPriceElement = formElement.querySelector('#price');
  var formTimeInElement = formElement.querySelector('#timein');
  var formTimeOutElement = formElement.querySelector('#timeout');
  var resetButtonElement = formElement.querySelector('.ad-form__reset');

  var validateForm = function () {
    if (formCapacityElement.value === NOT_FOR_GUESTS_VALUE && formRoomNumberElement.value !== ONE_HUNDRED_ROOMS_VALUE) {
      formRoomNumberElement.setCustomValidity('Для количества мест \'не для гостей\' доступно только количество комнат \'100 комнат\'');
      formCapacityElement.setCustomValidity('');
      formRoomNumberElement.focus();
      return false;
    }
    if (formRoomNumberElement.value === ONE_HUNDRED_ROOMS_VALUE && formCapacityElement.value !== NOT_FOR_GUESTS_VALUE) {
      formCapacityElement.setCustomValidity('Для количества комнат \'100 комнат\' доступно только количество мест \'не для гостей\'');
      formRoomNumberElement.setCustomValidity('');
      formCapacityElement.focus();
      return false;
    }
    if (formRoomNumberElement.value < formCapacityElement.value) {
      formCapacityElement.setCustomValidity('Количество мест не может превышать количество комнат');
      formRoomNumberElement.setCustomValidity('');
      formCapacityElement.focus();
      return false;
    }
    if (formHousingPriceElement.value < 0 || formHousingPriceElement.value > MAX_PRICE) {
      return false;
    }
    var minPrice = HousingMinPriceByType[formHousingTypeElement.value];
    if (formHousingTypeElement.value !== window.filter.typeAny && formHousingPriceElement.value < minPrice) {
      formHousingPriceElement.setCustomValidity('Для выбранного типа жилья минимальная цена составляет - ' + minPrice + ' рублей');
      formHousingTypeElement.focus();
      return false;
    }

    formCapacityElement.setCustomValidity('');
    formRoomNumberElement.setCustomValidity('');
    formHousingPriceElement.setCustomValidity('');
    return true;
  };

  var changePlaceholderPrice = function () {
    var newPlaceholderPrice = HousingMinPriceByType[formHousingTypeElement.value];
    formHousingPriceElement.placeholder = newPlaceholderPrice;
  };

  var onSuccessLoad = function () {
    window.dialog.showSuccessDialog();
    window.engine.deactivatePage();
  };

  var init = function () {
    window.form.elements.formAddressElement.readOnly = true;

    formCapacityElement.addEventListener('change', function () {
      validateForm();
    });

    formRoomNumberElement.addEventListener('change', function () {
      validateForm();
    });

    formHousingPriceElement.addEventListener('change', function () {
      validateForm();
    });

    formHousingPriceElement.addEventListener('input', function () {
      formHousingPriceElement.setCustomValidity('');
    });

    formHousingTypeElement.addEventListener('change', function () {
      validateForm();
      changePlaceholderPrice();
    });

    formTimeInElement.addEventListener('change', function () {
      formTimeOutElement.value = formTimeInElement.value;
    });

    formTimeOutElement.addEventListener('change', function () {
      formTimeInElement.value = formTimeOutElement.value;
    });

    formElement.addEventListener('submit', function (evt) {
      var data = new FormData(formElement);
      if (validateForm()) {
        window.backend.save(data, onSuccessLoad, window.dialog.showErrorDialog);
      }
      evt.preventDefault();
    });

    resetButtonElement.addEventListener('click', function () {
      window.mapPinMoving.setDefaultPosition();
      window.main.init();
    });
  };

  var elements = {
    formElement: formElement,
    formCapacityElement: formCapacityElement,
    formRoomNumberElement: formRoomNumberElement,
    formFieldsetElements: formFieldsetElements,
    formAddressElement: formAddressElement
  };

  window.form = {
    init: init,
    elements: elements
  };
})();
