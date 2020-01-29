'use strict';

var MAP_PINS = document.querySelector('.map__pins');
var PIN_TEMPLATE = document.querySelector('#pin');
var MAP_PIN = PIN_TEMPLATE.content.querySelector('.map__pin');

var ADS_LENGTH = 8;
var PRICE_COEFFICIENT = 10;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [1, 2, 3, 4];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var X_SHIFT = 20;
var Y_SHIFT = 40;
var MIN_Y = 130 + Y_SHIFT;
var MAX_Y = 630 - Y_SHIFT;
var MIN_X = X_SHIFT;
var MAX_X = MAP_PINS.offsetWidth - X_SHIFT;


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
  return index * PRICE_COEFFICIENT;
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


var generateAdElementArray = function () {
  var fragment = document.createDocumentFragment();
  var ads = getAds();

  for (var i = 0; i < ADS_LENGTH; i++) {
    fragment.appendChild(generateAdElement(ads[i]));
  }
  return fragment;
};

var generateAdElement = function (ad) {
  var newElement = MAP_PIN.cloneNode(true);

  newElement.style.left = (ad.location.x - X_SHIFT) + 'px';
  newElement.style.top = (ad.location.y - Y_SHIFT) + 'px';

  var img = newElement.getElementsByTagName('img')[0];

  img.src = ad.author.avatar;
  img.alt = ad.offer.title;

  return newElement;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

MAP_PINS.appendChild(generateAdElementArray());
