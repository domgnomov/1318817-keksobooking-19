'use strict';

var cardTemplateElement = document.querySelector('#card');
var mapCardTemplateElement = cardTemplateElement.content.querySelector('.map__card');
var pinTemplateElement = document.querySelector('#pin');
var mapPinTemplateElement = pinTemplateElement.content.querySelector('.map__pin');

var mapElement = document.querySelector('.map');
var mapFilterElement = document.querySelector('.map__filters-container');
var mapPinsElement = document.querySelector('.map__pins');
var mapMainPinButtonElement = mapPinsElement.querySelector('.map__pin--main');

var adFormElement = document.querySelector('.ad-form');
var adFormFieldsetElement = adFormElement.querySelectorAll('fieldset');
var addressElement = adFormElement.querySelector('#address');
var capacityElement = adFormElement.querySelector('#capacity');
var roomNumberElement = adFormElement.querySelector('#room_number');

var mapFormElement = document.querySelector('.map__filters');
var mapFormFieldsetElement = mapFormElement.querySelectorAll('fieldset');
var mapFormSelectElement = mapFormElement.querySelectorAll('select');

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
var MAX_X = mapPinsElement.offsetWidth - (PIN_WIDTH / 2);

var LEFT_MOUSE_BUTTON_CODE = 0;
var ENTER_KEY = 'Enter';

var NOT_FOR_GUESTS_VALUE = '0';
var ONE_HUNDRED_ROOMS_VALUE = '100';


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
  var newElement = mapPinTemplateElement.cloneNode(true);

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
  disableElements(adFormFieldsetElement);
  adFormElement.classList.add('ad-form--disabled');
  disableElements(mapFormFieldsetElement);
  disableElements(mapFormSelectElement);
  mapElement.classList.add('map--faded');
};

var activatePage = function () {
  enableElements(adFormFieldsetElement);
  adFormElement.classList.remove('ad-form--disabled');
  enableElements(mapFormFieldsetElement);
  enableElements(mapFormSelectElement);
  mapElement.classList.remove('map--faded');

  setAddress(PIN_WIDTH / 2, PIN_HEIGHT_WITH_POINTER);
};

var setAddress = function (xShift, yShift) {
  addressElement.readOnly = true;
  var x = Math.round(1 * (mapMainPinButtonElement.style.left.replace('px', '')) + xShift);
  var y = Math.round(1 * (mapMainPinButtonElement.style.top.replace('px', '')) + yShift);
  addressElement.value = x + ', ' + y;
};

var initPage = function () {
  deactivatePage();

  mapMainPinButtonElement.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      activatePage();
    }
  });

  mapMainPinButtonElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
    }
  });

  capacityElement.addEventListener('change', function () {
    validateForm();
  });

  roomNumberElement.addEventListener('change', function () {
    validateForm();
  });

  activateElements();

  setAddress(PIN_WIDTH / 2, PIN_HEIGHT_WITHOUT_POINTER / 2);
};

var validateForm = function () {
  if (capacityElement.value === NOT_FOR_GUESTS_VALUE && roomNumberElement.value !== ONE_HUNDRED_ROOMS_VALUE) {
    roomNumberElement.setCustomValidity('Для количества гостей \'не для гостей\' доступно только количество комнат \'100 комнат\'');
    capacityElement.setCustomValidity('');
    roomNumberElement.focus();
    return false;
  }
  if (roomNumberElement.value === ONE_HUNDRED_ROOMS_VALUE && capacityElement.value !== NOT_FOR_GUESTS_VALUE) {
    capacityElement.setCustomValidity('Для количества комнат \'100 комнат\' доступно только количество гостей \'не для гостей\'');
    roomNumberElement.setCustomValidity('');
    capacityElement.focus();
    return false;
  }
  if (roomNumberElement.value < capacityElement.value) {
    capacityElement.setCustomValidity('Количество гостей не может превышать количество комнат');
    roomNumberElement.setCustomValidity('');
    capacityElement.focus();
    return false;
  }
  capacityElement.setCustomValidity('');
  roomNumberElement.setCustomValidity('');
  return true;
};

// Создание и показ объявлений
var activateElements = function () {
  var ads = getAds();
  mapPinsElement.appendChild(generateAdElementArray(ads));
  // Показ одного объявления, поменять 0 на 1
  var cards = generateCardElementArray(ads, 0);
  mapElement.insertBefore(cards, mapFilterElement);
};

initPage();
