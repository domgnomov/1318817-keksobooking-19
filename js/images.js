'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var HOUSE_PHOTO_PREVIEW_WIDTH = 70;
  var HOUSE_PHOTO_PREVIEW_HEIGHT = 70;
  var HOUSE_PHOTO_PREVIEW_ID_NAME = 'house-photo-preview';

  var AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var housePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housePhotoPreviewContainer = document.querySelector('.ad-form__photo');

  housePhotoChooser.addEventListener('change', function () {
    choosePhoto(housePhotoChooser, getHousePhotoPreview());
  });

  avatarChooser.addEventListener('change', function () {
    choosePhoto(avatarChooser, avatarPreview);
  });

  var getHousePhotoPreview = function () {
    var housePhotoPreview = getHousePhotoPreviewElement();
    if (!housePhotoPreview) {
      housePhotoPreview = document.createElement('img');
      housePhotoPreview.setAttribute('id', HOUSE_PHOTO_PREVIEW_ID_NAME);
      housePhotoPreview.width = HOUSE_PHOTO_PREVIEW_WIDTH;
      housePhotoPreview.height = HOUSE_PHOTO_PREVIEW_HEIGHT;
      housePhotoPreviewContainer.appendChild(housePhotoPreview);
    }
    return housePhotoPreview;
  };

  var getHousePhotoPreviewElement = function () {
    return housePhotoPreviewContainer.querySelector('#' + HOUSE_PHOTO_PREVIEW_ID_NAME);
  };

  var choosePhoto = function (chooser, preview) {
    var file = chooser.files[0];
    if (!file) {
      return;
    }
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var clearPreviews = function () {
    avatarPreview.src = AVATAR_DEFAULT_SRC;
    var housePhotoPreview = getHousePhotoPreviewElement();
    if (housePhotoPreview) {
      housePhotoPreviewContainer.removeChild(housePhotoPreview);
    }
  };

  window.images = {
    clearPreviews: clearPreviews
  };
})();
