'use strict';

(function () {
  var formElement = document.querySelector('.ad-form');
  var formCapacityElement = formElement.querySelector('#capacity');
  var formRoomNumberElement = formElement.querySelector('#room_number');
  var formFieldsetElement = formElement.querySelectorAll('fieldset');
  var formAddressElement = formElement.querySelector('#address');

  var successTemplateElement = document.querySelector('#success');
  var successDialogElement = successTemplateElement.content.querySelector('.success').cloneNode(true);
/*  var errorTemplateElement = document.querySelector('#error');
  var errorDialogElement = errorTemplateElement.content.querySelector('.error').cloneNode(true);*/

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

  var onSuccessDialogEscPress = function (evt) {
    window.keyboardUtil.isEscEvent(evt, closeSuccessDialog);
  };

  var onSuccessDialogClick = function (evt) {
    closeSuccessDialog();
  };

  var showSuccessDialog = function () {
    var mainElement = document.getElementsByTagName('main')[0];
    mainElement.appendChild(successDialogElement);

    successDialogElement.classList.remove('hidden');
    successDialogElement.focus();
    successDialogElement.addEventListener('keydown', onSuccessDialogEscPress);
    successDialogElement.addEventListener('click', onSuccessDialogClick);
  };

  var closeSuccessDialog = function () {
    successDialogElement.classList.add('hidden');
    successDialogElement.removeEventListener('keydown', onSuccessDialogEscPress);
    successDialogElement.removeEventListener('click', onSuccessDialogClick);
  };

  /*var onErrorDialogEscPress = function (evt) {
    window.keyboardUtil.isEscEvent(evt, closeErrorDialog);
  };

  var onErrorDialogClick = function (evt) {
    closeErrorDialog();
  };

  var showErrorDialog = function () {
    var mainElement = document.getElementsByTagName('main')[0];
    mainElement.appendChild(errorTemplateElement);

    errorTemplateElement.classList.remove('hidden');
    errorTemplateElement.addEventListener('keydown', onErrorDialogEscPress);
    errorTemplateElement.addEventListener('click', onErrorDialogClick);
  };

  var closeErrorDialog = function () {
    errorTemplateElement.classList.add('hidden');
    errorTemplateElement.removeEventListener('keydown', onErrorDialogEscPress);
    errorTemplateElement.removeEventListener('click', onErrorDialogClick);
  };*/



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
          showSuccessDialog();
          window.engine.deactivatePage();
        });
      }
      evt.preventDefault();
    });
  };

  var elements = {
    formElement: formElement,
    formCapacityElement: formCapacityElement,
    formRoomNumberElement: formRoomNumberElement,
    formFieldsetElement: formFieldsetElement,
    formAddressElement: formAddressElement,
    successDialogElement: successDialogElement
  };

  window.form = {
    init: init,
    validateForm: validateForm,
    elements: elements
  };
})();
