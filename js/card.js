'use strict';

(function () {
  var cardTemplateElement = document.querySelector('#card');
  var mapCardTemplateElement = cardTemplateElement.content.querySelector('.map__card');

  var generateCardElementArray = function (ads, count) {
    return ads.slice(0, count).reduce(function (fragment, element) {
      fragment.appendChild(generateCardElement(element));
      return fragment;
    }, document.createDocumentFragment());
  };

  var getTypeName = function (type) {
    switch (type) {
      case 'palace': return 'Дворец';
      case 'flat': return 'Квартира';
      case 'house': return 'Дом';
      case 'bungalo': return 'Бунгало';
      default: return 'Тип не определен';
    }
  };

  var fillFeatures = function (container, features) {
    var children = container.querySelectorAll('.popup__feature');

    Array.prototype.forEach.call(children, function (element) {
      element.style.display = 'none';
    });

    features.forEach(function (feature) {
      container.querySelector('.popup__feature--' + feature).style.display = '';
    });
  };

  var fillPhotos = function (container, photos) {
    var fragment = document.createDocumentFragment();
    var photo = container.querySelector('.popup__photo');

    photos.forEach(function (element) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = element;
      fragment.appendChild(newPhoto);
    });
    container.appendChild(fragment);
    container.removeChild(photo);
  };

  var generateCardElement = function (ad) {
    var newElement = mapCardTemplateElement.cloneNode(true);

    newElement.querySelector('.popup__title').textContent = ad.offer.title;
    newElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    newElement.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
    newElement.querySelector('.popup__type').textContent = getTypeName(ad.offer.type);
    newElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    newElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    fillFeatures(newElement.querySelector('.popup__features'), ad.offer.features);
    newElement.querySelector('.popup__description').textContent = ad.offer.description;
    fillPhotos(newElement.querySelector('.popup__photos'), ad.offer.photos);
    newElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return newElement;
  };

  window.card = {
    generateCardElementArray: generateCardElementArray,
    generateCardElement: generateCardElement
  };
})();
