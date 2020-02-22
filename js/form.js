'use strict';

(function () {
  var formElement = document.querySelector('.ad-form');
  var formCapacityElement = formElement.querySelector('#capacity');
  var formRoomNumberElement = formElement.querySelector('#room_number');
  var formFieldsetElement = formElement.querySelectorAll('fieldset');
  var formAddressElement = formElement.querySelector('#address');
  var formHousingTypeElement = formElement.querySelector('#type');
  var formHousingPriceElement = formElement.querySelector('#price');
  var formTimeInElement = formElement.querySelector('#timein');
  var formTimeOutElement = formElement.querySelector('#timeout');
  var resetButtonElement = formElement.querySelector('.ad-form__reset');

  var NOT_FOR_GUESTS_VALUE = '0';
  var ONE_HUNDRED_ROOMS_VALUE = '100';

  var HOUSING_MIN_PRICE_BY_TYPE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var MAX_PRICE = 1000000;

  var HOUSING_TYPE_ANY = 'any';

  var validateForm = function () {
    if (formCapacityElement.value === NOT_FOR_GUESTS_VALUE && formRoomNumberElement.value !== ONE_HUNDRED_ROOMS_VALUE) {
      formRoomNumberElement.setCustomValidity('Для количества гостей \'не для гостей\' доступно только количество комнат \'100 комнат\'');
      formCapacityElement.setCustomValidity('');
      formRoomNumberElement.focus();
      return false;
    }
    if (formRoomNumberElement.value === ONE_HUNDRED_ROOMS_VALUE && formCapacityElement.value !== NOT_FOR_GUESTS_VALUE) {
      formCapacityElement.setCustomValidity('Для количества комнат \'100 комнат\' доступно только количество гостей \'не для гостей\'');
      formRoomNumberElement.setCustomValidity('');
      formCapacityElement.focus();
      return false;
    }
    if (formRoomNumberElement.value < formCapacityElement.value) {
      formCapacityElement.setCustomValidity('Количество гостей не может превышать количество комнат');
      formRoomNumberElement.setCustomValidity('');
      formCapacityElement.focus();
      return false;
    }
    if (formHousingPriceElement.value < 0 || formHousingPriceElement.value > MAX_PRICE) {
      return false;
    }
    var minPrice = HOUSING_MIN_PRICE_BY_TYPE[formHousingTypeElement.value];
    if (formHousingTypeElement.value !== HOUSING_TYPE_ANY && formHousingPriceElement.value < minPrice) {
      formHousingPriceElement.setCustomValidity('Для выбранного типа жилья минимальная цена составляет - ' + minPrice + ' рублей');
      formHousingTypeElement.focus();
      return false;
    }

    formCapacityElement.setCustomValidity('');
    formRoomNumberElement.setCustomValidity('');
    formHousingPriceElement.setCustomValidity('');
    return true;
  };

  var onSuccessLoad = function () {
    window.dialog.showSuccessDialog();
    window.engine.deactivatePage();
  };

  var init = function () {
    formCapacityElement.addEventListener('change', function () {
      window.form.validateForm();
    });

    formRoomNumberElement.addEventListener('change', function () {
      window.form.validateForm();
    });

    formHousingPriceElement.addEventListener('change', function () {
      window.form.validateForm();
    });

    formHousingPriceElement.addEventListener('input', function () {
      formHousingPriceElement.setCustomValidity('');
    });

    formHousingTypeElement.addEventListener('change', function () {
      window.form.validateForm();
    });

    formTimeInElement.addEventListener('change', function () {
      formTimeOutElement.value = formTimeInElement.value;
    });

    formTimeOutElement.addEventListener('change', function () {
      formTimeInElement.value = formTimeOutElement.value;
    });

    formElement.addEventListener('submit', function (evt) {
      var data = new FormData(formElement);
      if (window.form.validateForm()) {
        window.backend.save(data, onSuccessLoad, window.dialog.showErrorDialog);
      }
      evt.preventDefault();
    });

    resetButtonElement.addEventListener('click', function () {
      window.form.elements.formElement.reset();
    });
  };

  var elements = {
    formElement: formElement,
    formCapacityElement: formCapacityElement,
    formRoomNumberElement: formRoomNumberElement,
    formFieldsetElement: formFieldsetElement,
    formAddressElement: formAddressElement
  };

  window.form = {
    init: init,
    validateForm: validateForm,
    elements: elements
  };
})();
