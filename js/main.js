'use strict';

var cardTemplate = document.querySelector('#card');
var mapCard = cardTemplate.content.querySelector('.map__card');
var pinTemplate = document.querySelector('#pin');
var mapPinTemplate = pinTemplate.content.querySelector('.map__pin');

var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');
var mapPins = document.querySelector('.map__pins');
var mapMainPinButton = mapPins.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormFieldSets = adForm.querySelectorAll('fieldset');
var address = adForm.querySelector('#address');
var capacity = adForm.querySelector('#capacity');
var roomNumber = adForm.querySelector('#room_number');

var mapForm = document.querySelector('.map__filters');
var mapFormFieldsets = mapForm.querySelectorAll('fieldset');
var mapFormSelects = mapForm.querySelectorAll('select');

var ADS_LENGTH = 8;
var PRICE_COEFFICIENT = 10;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [1, 2, 3, 4];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN_WIDTH = 65;
var PIN_HEIGHT_WITHOUT_POINTER = 65;
var PIN_POINTER_HEIGHT = 10;
var PIN_HEIGHT_WITH_POINTER = PIN_HEIGHT_WITHOUT_POINTER + PIN_POINTER_HEIGHT;


var MIN_Y = 130 + PIN_HEIGHT_WITH_POINTER;
var MAX_Y = 630 - PIN_HEIGHT_WITH_POINTER;
var MIN_X = PIN_WIDTH / 2;
var MAX_X = mapPins.offsetWidth - (PIN_WIDTH / 2);

var LEFT_MOUSE_BUTTON_CODE = 0;
var ENTER_KEY = 'Enter';


var getAuthor = function (index) {
  return {avatar: getAvatar(index)};
};

var getOffer = function (index, location) {
  return {
    title: getTitle(index),
    address: getAddress(location),
    price: getPrice(index),
    type: getType(),
    rooms: getRooms(),
    guests: getGuests(),
    checkin: getCheckin(),
    checkout: getCheckout(),
    features: getFeatures(),
    description: getDescription(index),
    photos: getPhotos()
  };

};

var getLocation = function () {
  return {x: getX(), y: getY()};
};


var getAvatar = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};

var getTitle = function (index) {
  return 'Title ' + index;
};

var getAddress = function (location) {
  return location.x + ', ' + location.y;
};

var getPrice = function (index) {
  return (index + 1) * PRICE_COEFFICIENT;
};

var getType = function () {
  return getRandomValue(OFFER_TYPES);
};

var getRooms = function () {
  return getRandomValue(ROOMS);
};

var getGuests = function () {
  return getRandomValue(GUESTS);
};

var getCheckin = function () {
  return getRandomValue(TIMES);
};

var getCheckout = function () {
  return getRandomValue(TIMES);
};

var getFeatures = function () {
  return getRandomLengthArray(FEATURES);
};

var getDescription = function (index) {
  return 'Description ' + index;
};

var getPhotos = function () {
  return getRandomLengthArray(PHOTOS);
};

var getX = function () {
  return getRandom(MIN_X, MAX_X);
};

var getY = function () {
  return getRandom(MIN_Y, MAX_Y);
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


var getRandomValue = function (array) {
  return array[getRandom(0, array.length)];
};

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

var getRandomLengthArray = function (array) {
  var randomLength = 0;
  while (randomLength === 0) {
    randomLength = getRandom(0, array.length);
  }
  var result = [];
  for (var i = 0; i < randomLength; i++) {
    result.push(array[i]);
  }
  return result;
};


var getAds = function () {
  var ads = [];
  for (var i = 0; i < ADS_LENGTH; i++) {
    ads.push(createAd(i));
  }
  return ads;
};

var createAd = function (index) {
  var location = getLocation();
  var author = getAuthor(index);
  var offer = getOffer(index, location);
  var add = {
    author: author,
    offer: offer,
    location: location
  };
  return add;
};


var generateAdElementArray = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ADS_LENGTH; i++) {
    fragment.appendChild(generateAdElement(ads[i]));
  }
  return fragment;
};

var generateAdElement = function (ad) {
  var newElement = mapPinTemplate.cloneNode(true);

  newElement.style.left = (ad.location.x - (PIN_WIDTH / 2)) + 'px';
  newElement.style.top = (ad.location.y - PIN_HEIGHT_WITH_POINTER) + 'px';

  var img = newElement.getElementsByTagName('img')[0];

  img.src = ad.author.avatar;
  img.alt = ad.offer.title;

  return newElement;
};

var generateCardElementArray = function (ads, count) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < count; i++) {
    fragment.appendChild(generateCardElement(ads[i]));
  }
  return fragment;
};

var generateCardElement = function (ad) {
  var newElement = mapCard.cloneNode(true);

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

var deactivatePage = function () {
  disableElements(adFormFieldSets);
  adForm.classList.add('ad-form--disabled');
  disableElements(mapFormFieldsets);
  disableElements(mapFormSelects);
  map.classList.add('map--faded');
};

var activatePage = function () {
  enableElements(adFormFieldSets);
  adForm.classList.remove('ad-form--disabled');
  enableElements(mapFormFieldsets);
  enableElements(mapFormSelects);
  map.classList.remove('map--faded');

  setAddress(PIN_WIDTH / 2, PIN_HEIGHT_WITH_POINTER);
};

var setAddress = function (xShift, yShift) {
  address.readOnly = true;
  var x = Math.round(1 * (mapMainPinButton.style.left.replace('px','')) + xShift);
  var y = Math.round(1 * (mapMainPinButton.style.top.replace('px','')) + yShift);
  address.value = x + ', ' + y;
};

var initPage = function () {
  deactivatePage();

  mapMainPinButton.addEventListener( 'mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      activatePage();
    }
  });

  mapMainPinButton.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
    }
  });

  capacity.addEventListener('change', function () {
    debugger;
    if (capacity.value * 1 === 0 && roomNumber.value * 1 !== 100) {
      capacity.setCustomValidity('Выбранное количество гостей не предназначено для выбранного количества комнат. Выберите - Не для гостей');
      return;
    }
    if (roomNumber.value < capacity.value) {
      capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
      return;
    }
    capacity.setCustomValidity('');
  });

  roomNumber.addEventListener('change', function () {
    debugger;
    if (roomNumber.value * 1 === 100 && capacity.value * 1 !== 0) {
      roomNumber.setCustomValidity('Выбранное количество комнат не предназначено для гостей. Выберите - 100 комнат');
      return;
    }
    if (roomNumber.value < capacity.value) {
      roomNumber.setCustomValidity('Количество комнат не может быть меньше количества гостей');
      return;
    }
    roomNumber.setCustomValidity('');
  });

  activateElements();

  setAddress(PIN_WIDTH / 2, PIN_HEIGHT_WITHOUT_POINTER / 2);
};


// Создание и показ объявлений
var activateElements = function () {
  var ads = getAds();
  mapPins.appendChild(generateAdElementArray(ads));
  // Показ одного объявления, поменять 0 на 1
  var cards = generateCardElementArray(ads, 0);
  map.insertBefore(cards, mapFilter);
};

initPage();
