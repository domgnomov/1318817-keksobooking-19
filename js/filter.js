'use strict';

(function () {
  var RADIX = 10;

  var TYPE_ANY = 'any';

  var MIN_HIGH_PRICE = 50000;
  var MIN_MIDDLE_PRICE = 10000;

  var getFilteredAds = function (ads) {
    var result = ads.slice();

    var typeFilterValue = window.map.elements.mapFormHousingTypeElement.value;
    if (typeFilterValue !== TYPE_ANY) {
      result = filterByType(result, typeFilterValue);
    }

    var priceFilterValue = window.map.elements.mapFormHousingPriceElement.value;
    if (priceFilterValue !== TYPE_ANY) {
      result = filterByPrice(result, priceFilterValue);
    }

    var roomsFilterValue = window.map.elements.mapFormHousingRoomsElement.value;
    if (roomsFilterValue !== TYPE_ANY) {
      result = filterByRooms(result, roomsFilterValue);
    }

    var guestsFilterValue = window.map.elements.mapFormHousingGuestsElement.value;
    if (guestsFilterValue !== TYPE_ANY) {
      result = filterByGuests(result, guestsFilterValue);
    }

    if (window.map.elements.mapFormWifiElement.checked) {
      result = filterByFeature(result, 'wifi');
    }

    if (window.map.elements.mapFormDishwasherElement.checked) {
      result = filterByFeature(result, 'dishwasher');
    }

    if (window.map.elements.mapFormParkingElement.checked) {
      result = filterByFeature(result, 'parking');
    }

    if (window.map.elements.mapFormWasherElement.checked) {
      result = filterByFeature(result, 'washer');
    }

    if (window.map.elements.mapFormElevatorElement.checked) {
      result = filterByFeature(result, 'elevator');
    }

    if (window.map.elements.mapFormConditionerElement.checked) {
      result = filterByFeature(result, 'conditioner');
    }

    return result;
  };

  var filterByType = function (ads, value) {
    return ads.filter(function (ad) {
      return ad.offer.type.toString() === value;
    });
  };

  var filterByPrice = function (ads, value) {
    return ads.filter(function (ad) {
      return getValueByPrice(ad.offer.price) === value;
    });
  };

  var filterByRooms = function (ads, value) {
    return ads.filter(function (ad) {
      return ad.offer.rooms.toString() === value;
    });
  };

  var filterByGuests = function (ads, value) {
    return ads.filter(function (ad) {
      if (parseInt(value, RADIX) === 0) {
        return ad.offer.guests === 0;
      }
      return ad.offer.guests >= value;
    });
  };

  var filterByFeature = function (ads, value) {
    return ads.filter(function (ad) {
      return ad.offer.features.includes(value);
    });
  };

  var getValueByPrice = function (price) {
    if (price >= MIN_HIGH_PRICE) {
      return 'high';
    } else if (price >= MIN_MIDDLE_PRICE) {
      return 'middle';
    } else {
      return 'low';
    }
  };

  window.filter = {
    typeAny: TYPE_ANY,
    getFilteredAds: getFilteredAds
  };

})();
