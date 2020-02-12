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

  var generateAdElementArray = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ADS_LENGTH; i++) {
      fragment.appendChild(generateAdElement(ads[i]));
    }
    return fragment;
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

  window.adFactory = {
    generateAdElementArray: generateAdElementArray,
    elements: elements
  };

})();
