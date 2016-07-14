(function () {
  'use strict';

  angular.module('btest')
    .factory('commentFactory', commentFactory);


  function commentFactory() {
    return {

      idToArray: function (data) {
        return data.split('.')

      },
      idToString: function (data) {

      }
    }
  }
})();
