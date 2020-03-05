'use strict';

(function () {

  var init = function () {
    window.map.init();
    window.mapPinMoving.init();
    window.form.init();
    window.engine.deactivatePage();
  };

  init();

  window.main = {
    init: init
  };
})();

