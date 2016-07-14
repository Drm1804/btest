(function () {
    'use strict';

  angular.module('btest')
    .directive('reply', reply);

  function reply(){

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
      templateUrl: 'app/components/article/directives/reply.html',
      link: link
    };

  }

})();
