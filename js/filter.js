'use strict';

(function () {

  var getFilteredAds = function (ads) {
    var result = ads.slice();

    var typeFilterValue = window.map.elements.mapFormHousingTypeElement.value;
    if (typeFilterValue !== 'any') {
      result = filterByType(result, typeFilterValue);
    }

    var roomsFilterValue = window.map.elements.mapFormHousingRoomsElement.value;
    if (roomsFilterValue !== 'any') {
      result = filterByRooms(result, roomsFilterValue);
    }

    return result;
  };

  var filterByType = function (ads, value) {
    return ads.slice().filter(function (ad) {
      return ad.offer.type.toString() === value;
    });
  };

  var filterByRooms = function (ads, value) {
    return ads.slice().filter(function (ad) {
      return ad.offer.rooms.toString() === value;
    });
  };

  window.filter = {
    getFilteredAds: getFilteredAds
  };

})();
