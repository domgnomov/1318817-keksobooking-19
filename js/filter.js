'use strict';

(function () {

  var getFilteredAds = function (ads) {
    var result = ads.slice();

    var typeFilterValue = window.map.elements.mapFormHousingTypeElement.value;
    if (typeFilterValue !== 'any') {
      result = filterByType(result, typeFilterValue);
    }

    var priceFilterValue = window.map.elements.mapFormHousingPriceElement.value;
    if (priceFilterValue !== 'any') {
      result = filterByPrice(result, priceFilterValue);
    }

    var roomsFilterValue = window.map.elements.mapFormHousingRoomsElement.value;
    if (roomsFilterValue !== 'any') {
      result = filterByRooms(result, roomsFilterValue);
    }

    var guestsFilterValue = window.map.elements.mapFormHousingGuestsElement.value;
    if (guestsFilterValue !== 'any') {
      result = filterByGuests(result, guestsFilterValue);
    }

    return result;
  };

  var filterByType = function (ads, value) {
    return ads.slice().filter(function (ad) {
      return ad.offer.type.toString() === value;
    });
  };

  var filterByPrice = function (ads, value) {
    return ads.slice().filter(function (ad) {
      return getValueByPrice(ad.offer.price) === value;
    });
  };

  var filterByRooms = function (ads, value) {
    return ads.slice().filter(function (ad) {
      return ad.offer.rooms.toString() === value;
    });
  };

  var filterByGuests = function (ads, value) {
    return ads.slice().filter(function (ad) {
      if (parseInt(value) === 0) {
        return ad.offer.guests === 0;
      }
      return ad.offer.guests >= value;
    });
  };

  var getValueByPrice = function (price) {
    if (price >= 50000) {
      return 'high';
    } else if (price >= 10000) {
      return 'middle';
    } else {
      return 'low'
    }
  };

  window.filter = {
    getFilteredAds: getFilteredAds
  };

})();
