(function () {
    'use strict';

  angular.module('btest')
    .directive('addComment', addComment);

  function addComment(){


    function link(scope, element, attrs){
      scope.$watch(function() {
        // console.log(scope.data);
      });



      // console.log(element);
      // console.log(attrs);
    }

    controller.$inject = ['$scope', '$element'];

    function controller(a, b, c){
      console.log(b.parent('.b-art-com-box'))
    }

    return{
      restrict: "E",
      replace: true,
      scope: {
        data: '='
      },
      templateUrl: 'app/components/article/directives/add-comment/add-comment.html',
      link: link,
      controller: controller
    };

  }
})();
