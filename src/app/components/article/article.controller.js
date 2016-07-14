// Контроллер является связующим элементом между сервисом и view


(function () {
    'use strict';

  angular.module('btest')
    .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope', '$article', '$sce', '$rootScope', 'commentFactory', 'articleService'];

  function ArticleController($scope, $article, $sce, $rootScope, commentFactory, articleService){
    var vm = this;
    vm.data = [];
    vm.sce = $sce;

    vm.getComments = getComments;

    vm.run = run;
    vm.run();






    function getComments(){
      vm.data = articleService.comments;
    }

    function run(){
      vm.getComments();

      // Подписываемся на событие перезагрузки данных
      $rootScope.$on('comment:reload', function(){
        vm.getComments()
      });
    }
  }

})();
