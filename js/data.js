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

  var initAds = function (ads) {
    initialAds = ads.slice();
  };

  var getInitialAds = function () {
    return initialAds;
  };

  var getFilteredAds = function () {
    return window.filter.getFilteredAds(initialAds);
  };

  var getAdElements = function (ads) {
    clearAds();

    var arrayLength = ads.length < ADS_LENGTH ? ads.length : ADS_LENGTH;
    return ads.slice(0, arrayLength).reduce(function (fragment, element) {
      fragment.appendChild(getAdElement(element));
      return fragment;
    }, document.createDocumentFragment());
  };

  var clearAds = function () {
    var children = window.map.elements.mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    children.forEach(function (child) {
      window.map.elements.mapPinsElement.removeChild(child);
    });
  };

  var getAdElement = function (ad) {
    var newElement = window.map.elements.mapPinElement.cloneNode(true);

    newElement.style.left = (ad.location.x - (window.engine.elements.PIN_WIDTH / 2)) + 'px';
    newElement.style.top = (ad.location.y - window.engine.elements.PIN_HEIGHT_WITH_POINTER) + 'px';

    var img = newElement.getElementsByTagName('img')[0];

    img.src = ad.author.avatar;
    img.alt = ad.offer.title;

    var cardElement = window.card.getCardElement(ad);

    newElement.addEventListener('click', function () {
      window.map.elements.mapElement.insertBefore(cardElement, window.map.elements.mapFilterElement);
    });

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
    initAds: initAds,
    getInitialAds: getInitialAds,
    getFilteredAds: getFilteredAds,
    getAdElements: getAdElements,
    initialAds: initialAds,
    elements: elements
  };

})();
