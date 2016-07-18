(function () {
    'use strict';


  angular.module('btest')
    .directive('comment', comment);

  function comment(){
    return{
      restrict: "E",
      replace: false,
      scope: {
        comments: '='
      },
      templateUrl: 'app/components/article/directives/comment/comment.html'
    };

  }

})();
