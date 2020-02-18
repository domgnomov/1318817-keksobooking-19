'use strict';

(function () {

  var getFilteredAds = function (ads) {
    var result = getHousingRoomsFilterAds(ads);
    result = getHousingTypeFilterAds(result);
    return result;
  };

  var getHousingTypeFilterAds = function (ads) {
    if (window.map.elements.housingTypeFormElement.value === 'any') {
      return ads;
    }
    return ads.slice().filter(function (ad) {
      return ad.offer.type === window.map.elements.housingTypeFormElement.value;
    });
  };

  var getHousingRoomsFilterAds = function (ads) {
    if (window.map.elements.housingRoomsFormElement.value === 'any') {
      return ads;
    }
    return ads.slice().filter(function (ad) {
      return (ad.offer.rooms + '') === window.map.elements.housingRoomsFormElement.value;
    });
  };

  window.filter = {
    getFilteredAds: getFilteredAds
  };

})();
