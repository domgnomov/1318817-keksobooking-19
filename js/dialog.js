'use strict';

(function () {
  var mainElement = document.getElementsByTagName('main')[0];
  var successTemplateElement = document.querySelector('#success');
  var successDialogElement = successTemplateElement.content.querySelector('.success').cloneNode(true);
  var errorTemplateElement = document.querySelector('#error');
  var errorDialogElement = errorTemplateElement.content.querySelector('.error').cloneNode(true);
  var errorDialogErrorMessageElement = errorDialogElement.querySelector('.error__message');

  var onSuccessDialogEscPress = function (evt) {
    window.keyboardUtil.isEscEvent(evt, closeSuccessDialog);
  };

  var onSuccessDialogClick = function () {
    closeSuccessDialog();
  };

  var onErrorDialogEscPress = function (evt) {
    window.keyboardUtil.isEscEvent(evt, closeErrorDialog);
  };

  var onErrorDialogClick = function () {
    closeErrorDialog();
  };

  var showSuccessDialog = function () {
    showDialog(successDialogElement, onSuccessDialogEscPress, onSuccessDialogClick);
  };

  var closeSuccessDialog = function () {
    closeDialog(successDialogElement, onSuccessDialogEscPress, onSuccessDialogClick);
  };

  var showErrorDialog = function (errorMessage) {
    errorDialogErrorMessageElement.textContent = errorMessage;
    showDialog(errorDialogElement, onErrorDialogEscPress, onErrorDialogClick);
  };

  var closeErrorDialog = function () {
    closeDialog(errorDialogElement, onErrorDialogEscPress, onErrorDialogClick);
  };

  var closeDialog = function (element, onEscPress, onClick) {
    element.classList.add('hidden');
    element.removeEventListener('keydown', onEscPress);
    element.removeEventListener('click', onClick);
  };

  var showDialog = function (element, onEscPress, onClick) {
    mainElement.appendChild(element);
    element.classList.remove('hidden');
    element.focus();
    element.addEventListener('keydown', onEscPress);
    element.addEventListener('click', onClick);
  };

  window.dialog = {
    showErrorDialog: showErrorDialog,
    showSuccessDialog: showSuccessDialog
  };
})();
