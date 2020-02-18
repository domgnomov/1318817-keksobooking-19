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

  var data = [];

  var getFilteredAdElementArray = function () {
    if (data === 'undefined') {
      return 'undefined';
    }
    var filteredAds = window.filter.getFilteredAds(data);
    return generateAdElementArray(filteredAds);
  };

  var getAdElementArray = function (ads) {
    data = ads;
    return generateAdElementArray(ads);
  };

  var generateAdElementArray = function (ads) {
    clearAds();
    if (ads === 'undefined' || ads.length === 0) {
      return 'undefined';
    }
    var fragment = document.createDocumentFragment();

    var arrayLength = ads.length < ADS_LENGTH ? ads.length : ADS_LENGTH;
    for (var i = 0; i < arrayLength; i++) {
      fragment.appendChild(generateAdElement(ads[i]));
    }
    return fragment;
  };

  var clearAds = function () {
    var children = window.map.elements.mapPinsElement.querySelectorAll('.map__pin');
    children.forEach(function (child) {
      if (!child.isEqualNode(window.map.elements.mapMainPinButtonElement)) {
        window.map.elements.mapPinsElement.removeChild(child);
      }
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
