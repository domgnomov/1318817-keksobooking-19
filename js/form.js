'use strict';

(function () {
  var formElement = document.querySelector('.ad-form');
  var formCapacityElement = formElement.querySelector('#capacity');
  var formRoomNumberElement = formElement.querySelector('#room_number');
  var formFieldsetElement = formElement.querySelectorAll('fieldset');
  var formAddressElement = formElement.querySelector('#address');
  var resetButtonElement = formElement.querySelector('.ad-form__reset');

  var NOT_FOR_GUESTS_VALUE = '0';
  var ONE_HUNDRED_ROOMS_VALUE = '100';

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
    formCapacityElement.setCustomValidity('');
    formRoomNumberElement.setCustomValidity('');
    return true;
  };


  var init = function () {
    formCapacityElement.addEventListener('change', function () {
      window.form.validateForm();
    });

    formRoomNumberElement.addEventListener('change', function () {
      window.form.validateForm();
    });

    formElement.addEventListener('submit', function (evt) {
      if (window.form.validateForm()) {
        window.backend.save(new FormData(formElement), function () {
          window.dialog.showSuccessDialog();
          window.engine.deactivatePage();
        }, window.dialog.showErrorDialog);
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
