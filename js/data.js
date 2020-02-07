'use strict';

(function () {
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
    return window.util.getRandomValue(OFFER_TYPES);
  };

  var getRooms = function () {
    return window.util.getRandomValue(ROOMS);
  };

  var getGuests = function () {
    return window.util.getRandomValue(GUESTS);
  };

  var getCheckin = function () {
    return window.util.getRandomValue(TIMES);
  };

  var getCheckout = function () {
    return window.util.getRandomValue(TIMES);
  };

  var getFeatures = function () {
    return window.util.getRandomLengthArray(FEATURES);
  };

  var getDescription = function (index) {
    return 'Description ' + index;
  };

  var getPhotos = function () {
    return window.util.getRandomLengthArray(PHOTOS);
  };

  var getX = function () {
    return window.util.getRandom(window.engine.elements.MIN_X, window.engine.elements.MAX_X);
  };

  var getY = function () {
    return window.util.getRandom(window.engine.elements.MIN_Y, window.engine.elements.MAX_Y);
  };

  var getAds = function () {
    var ads = [];
    for (var i = 0; i < ADS_LENGTH; i++) {
      ads.push(window.adFactory.createAd(i));
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
    var newElement = window.map.elements.mapPinTemplateElement.cloneNode(true);

    newElement.style.left = (ad.location.x - (window.engine.elements.PIN_WIDTH / 2)) + 'px';
    newElement.style.top = (ad.location.y - window.engine.elements.PIN_HEIGHT_WITH_POINTER) + 'px';

    var img = newElement.getElementsByTagName('img')[0];

    img.src = ad.author.avatar;
    img.alt = ad.offer.title;

    return newElement;
  };

  var elements = {
    PRICE_COEFFICIENT: PRICE_COEFFICIENT,
    OFFER_TYPES: OFFER_TYPES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    TIMES: TIMES,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS
  }

  window.adFactory = {
    createAd: createAd,
    getAds: getAds,
    generateAdElementArray: generateAdElementArray,
    generateAdElement: generateAdElement,
    elements: elements
  };

})();
