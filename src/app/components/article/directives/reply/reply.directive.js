(function () {
    'use strict';

  angular.module('btest')
    .directive('reply', reply);

  function reply(){

    return{
      restrict: "E",
      replace: false,
      scope: {
        comments: '='
      },
      templateUrl: 'app/components/article/directives/reply/reply.html'
    };

  }

})();
