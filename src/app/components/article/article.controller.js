(function () {
    'use strict';

  angular.module('btest')
    .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope', '$article', '$sce'];

  function ArticleController($scope, $article, $sce){
    var vm = this;
    $scope.comments = [];
    vm.sce = $sce;

    vm.getComments = getComments;

    vm.run = run;
    vm.run();

    function getComments(){
      $article.getComments()
        .then(function(resp){
          $scope.comments = resp;
          // console.log(vm.comments);
        })
    }


    function run(){
      vm.getComments();
    }
  }

})();
