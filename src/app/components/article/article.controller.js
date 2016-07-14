(function () {
    'use strict';

  angular.module('btest')
    .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope', '$article', '$sce'];

  function ArticleController($scope, $article, $sce){
    var vm = this;
    vm.comments = [];
    vm.sce = $sce;

    vm.getComments = getComments;

    vm.run = run;
    vm.run();

    function getComments(){
      $article.getComments()
        .then(function(resp){
          vm.comments = resp;
        })
    }

    function run(){
      vm.getComments();
    }
  }

})();
