'use strict';

var ADS_LENGTH = 8;
var PRICE_COEFFICIENT = 10;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [1, 2, 3, 4];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getAuthor = function (index) {
  return {avatar: getAvatar(index)};
};

var getOffer = function (index) {
  return {
    title: getTitle(index),
    address: getAddress(),
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
  return 'img/avatars/user0' + index + '.png';
};

var getTitle = function (index) {
  return 'Title ' + index;
};

var getAddress = function () {
  var location = getLocation();
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
  return getRandomValue(FEATURES);
};

var getDescription = function (index) {
  return 'Description ' + index;
};

var getPhotos = function () {
  return getRandomValue(PHOTOS);
};

var getX = function () {
  return 100;
};

var getY = function () {
  return 100;
};

var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


var getAds = function () {
  var ads = new Array(ADS_LENGTH);
  for (var i = 0; i < ADS_LENGTH; i++) {
    ads[i] = createAd(i);
  }
};

var createAd = function (index) {
  var add = {
    author: getAuthor(index),
    offer: getOffer(index),
    location: getLocation()
  };
  return add;
};
