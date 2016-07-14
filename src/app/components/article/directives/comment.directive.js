(function () {
    'use strict';


  angular.module('btest')
    .directive('comment', comment);

  function comment(){

    function link(scope, element, attrs){
      scope.$watch(function() {
        console.log(scope.comments);
      });
      // console.log(element);
      // console.log(attrs);
    }


    return{
      restrict: "E",
      replace: false,
      scope: {
        comments: '='
      },
      templateUrl: 'app/components/article/directives/comment.html',
      link: link
    };

  }

})();
