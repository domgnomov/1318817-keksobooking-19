'use strict';

(function () {
  var cardTemplateElement = document.querySelector('#card');
  var mapCardTemplateElement = cardTemplateElement.content.querySelector('.map__card');

  var initCardEvents = function (element) {
    element.addEventListener('keydown', function (evt) {
      window.keyboardUtil.isEscEvent(evt, closeCardElement(element));
    });

    var closePopupElement = element.querySelector('.popup__close');
    closePopupElement.addEventListener('click', function () {
      closeCardElement(element)();
    });
  };

  var closeCardElement = function (element) {
    return function () {
      element.remove();
      window.data.setPinsToNonActiveState();
    };
  };

  var closeAllCardElements = function () {
    var children = document.querySelectorAll('.map__card');
    children.forEach(function (element) {
      closeCardElement(element)();
    });
  };

  var showCardElement = function (cardElement) {
    return function () {
      closeAllCardElements();
      window.map.elements.mapElement.insertBefore(cardElement, window.map.elements.mapFilterElement);
      cardElement.focus();
    };
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

  var getPrice = function (price) {
    return price + ' &#x20bd;<span>/ночь</span>';
  };

  var getCapacity = function (rooms, guests) {
    return rooms + ' комнаты для ' + guests + ' гостей';
  };

  var getTime = function (checkin, checkout) {
    return 'Заезд после ' + checkin + ', выезд до ' + checkout;
  };

  var setCardTextValue = function (value, isFieldExist, element) {
    if (isFieldExist) {
      element.textContent = value;
    } else {
      element.style.display = 'none';
    }
  };

  var setCardInnerHTMLValue = function (value, isFieldExist, element) {
    if (isFieldExist) {
      element.innerHTML = value;
    } else {
      element.style.display = 'none';
    }
  };

  var setFeaturesValues = function (values, isFieldExist, element) {
    if (isFieldExist) {
      var children = element.querySelectorAll('.popup__feature');

      Array.prototype.forEach.call(children, function (child) {
        child.style.display = 'none';
      });

      values.forEach(function (feature) {
        element.querySelector('.popup__feature--' + feature).style.display = '';
      });
    } else {
      element.style.display = 'none';
    }
  };

  var setPhotos = function (values, isFieldExist, element) {
    if (isFieldExist) {
      var fragment = document.createDocumentFragment();
      var photo = element.querySelector('.popup__photo');

      values.forEach(function (value) {
        var newPhoto = photo.cloneNode(true);
        newPhoto.src = value;
        fragment.appendChild(newPhoto);
      });

      element.appendChild(fragment);
      element.removeChild(photo);
    } else {
      element.style.display = 'none';
    }
  };

  var setAvatar = function (value, isFieldExist, element) {
    if (isFieldExist) {
      element.src = value;
    } else {
      element.style.display = 'none';
    }
  };

  var getCardElement = function (ad) {
    var newElement = mapCardTemplateElement.cloneNode(true);

    setCardTextValue(ad.offer.title, 'title' in ad.offer, newElement.querySelector('.popup__title'));
    setCardTextValue(ad.offer.address, 'address' in ad.offer, newElement.querySelector('.popup__text--address'));
    setCardInnerHTMLValue(getPrice(ad.offer.price), 'price' in ad.offer, newElement.querySelector('.popup__text--price'));
    setCardTextValue(getTypeName(ad.offer.type), 'type' in ad.offer, newElement.querySelector('.popup__type'));
    setCardTextValue(getCapacity(ad.offer.rooms, ad.offer.guests), ('rooms' in ad.offer) && ('guests' in ad.offer), newElement.querySelector('.popup__text--capacity'));
    setCardTextValue(getTime(ad.offer.checkin, ad.offer.checkout), ('checkin' in ad.offer) && ('checkout' in ad.offer), newElement.querySelector('.popup__text--time'));
    setFeaturesValues(ad.offer.features, 'features' in ad.offer, newElement.querySelector('.popup__features'));
    setCardTextValue(ad.offer.description, 'description' in ad.offer, newElement.querySelector('.popup__description'));
    setPhotos(ad.offer.photos, 'photos' in ad.offer, newElement.querySelector('.popup__photos'));
    setAvatar(ad.author.avatar, 'avatar' in ad.author, newElement.querySelector('.popup__avatar'));

    initCardEvents(newElement);

    return newElement;
  };

  window.card = {
    getCardElement: getCardElement,
    showCardElement: showCardElement,
    closeAllCardElements: closeAllCardElements
  };
})();
