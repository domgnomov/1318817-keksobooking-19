'use strict';

(function () {
  var getRandomValue = function (array) {
    return array[getRandom(0, array.length)];
  };

  var getRandom = function (min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  };

  var getRandomLengthArray = function (array) {
    var randomLength = 0;
    while (randomLength === 0) {
      randomLength = getRandom(0, array.length);
    }
    var result = [];
    for (var i = 0; i < randomLength; i++) {
      result.push(array[i]);
    }
    return result;
  };

  window.util = {
    getRandomValue: getRandomValue,
    getRandom: getRandom,
    getRandomLengthArray: getRandomLengthArray
  };
})();
