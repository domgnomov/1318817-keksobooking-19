'use strict';

(function () {
  var ADS_LENGTH = 5;
  var PRICE_COEFFICIENT = 10;
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 4];
  var GUESTS = [1, 2, 3, 4];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var initialAds = [];

  var getFilteredAdElementArray = function () {
    var filteredAds = window.filter.getFilteredAds(initialAds);
    return generateAdElementArray(filteredAds);
  };

  var getAdElementArray = function (ads) {
    initialAds = ads.slice();
    return generateAdElementArray(ads);
  };

  var generateAdElementArray = function (ads) {
    clearAds();

    var arrayLength = ads.length < ADS_LENGTH ? ads.length : ADS_LENGTH;
    return ads.slice(0, arrayLength).reduce(function (fragment, element) {
      fragment.appendChild(generateAdElement(element));
      return fragment;
    }, document.createDocumentFragment());
  };

  var clearAds = function () {
    var children = window.map.elements.mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    children.forEach(function (child) {
      window.map.elements.mapPinsElement.removeChild(child);
    });
  };

  var generateAdElement = function (ad) {
    var newElement = window.map.elements.mapPinElement.cloneNode(true);

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
  };

  window.data = {
    getAdElementArray: getAdElementArray,
    getFilteredAdElementArray: getFilteredAdElementArray,
    elements: elements
  };

})();
