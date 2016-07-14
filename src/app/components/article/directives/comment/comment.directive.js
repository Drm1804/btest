(function () {
    'use strict';


  angular.module('btest')
    .directive('comment', comment);

  function comment(){

    controller.$inject = ['$scope','$element'];
    function controller($scope, $element){
      $scope.showForm = false;

      $scope.$watch(function() {

      });
      

    }

    return{
      restrict: "E",
      replace: false,
      scope: {
        comments: '='
      },
      templateUrl: 'app/components/article/directives/comment/comment.html',
      controller: controller
    };

  }

})();
