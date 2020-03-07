'use strict';

(function () {
  var ADS_LENGTH = 5;

  var initialAds = [];

  var initAds = function (ads) {
    initialAds = ads.slice().filter(function (ad) {
      return 'offer' in ad;
    });
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

    newElement.style.left = (ad.location.x - (window.map.mainPinWidth / 2)) + 'px';
    newElement.style.top = (ad.location.y - window.map.mainPinHeight) + 'px';

    var img = newElement.getElementsByTagName('img')[0];
    if (ad.author.avatar) {
      img.src = ad.author.avatar;
      img.alt = ad.offer.title;
    }

    initAdElementEvents(newElement, ad);

    return newElement;
  };

  var setPinsToNonActiveState = function () {
    var children = window.map.elements.mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    children.forEach(function (child) {
      child.classList.remove('map__pin--active');
    });
  };

  var initAdElementEvents = function (element, ad) {
    var cardElement = window.card.getCardElement(ad);

    element.addEventListener('click', function () {
      window.card.showCardElement(cardElement)();
      setPinsToNonActiveState();
      element.classList.add('map__pin--active');
    });

    element.addEventListener('keydown', function (evt) {
      window.keyboardUtil.isEnterEvent(evt, window.card.showCardElement(cardElement));
    });
  };

  window.data = {
    initAds: initAds,
    getInitialAds: getInitialAds,
    getFilteredAds: getFilteredAds,
    getAdElements: getAdElements,
    setPinsToNonActiveState: setPinsToNonActiveState,
    clearAds: clearAds,
    initialAds: initialAds
  };
})();
