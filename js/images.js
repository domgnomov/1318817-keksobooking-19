'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var HOUSE_PHOTO_PREVIEW_WIDTH = 70;
  var HOUSE_PHOTO_PREVIEW_HEIGHT = 70;
  var HOUSE_PHOTO_PREVIEW_ID_NAME = 'house-photo-preview';

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
    var housePhotoPreview = housePhotoPreviewContainer.querySelector('#' + HOUSE_PHOTO_PREVIEW_ID_NAME);
    if (!housePhotoPreview) {
      housePhotoPreview = document.createElement('img');
      housePhotoPreview.setAttribute('id', HOUSE_PHOTO_PREVIEW_ID_NAME);
      housePhotoPreview.width = HOUSE_PHOTO_PREVIEW_WIDTH;
      housePhotoPreview.height = HOUSE_PHOTO_PREVIEW_HEIGHT;
      housePhotoPreviewContainer.appendChild(housePhotoPreview);
    }
    return housePhotoPreview;
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
})();
