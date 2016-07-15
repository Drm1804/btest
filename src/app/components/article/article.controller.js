// Контроллер является связующим элементом между сервисом и view


(function () {
    'use strict';

  angular.module('btest')
    .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$scope', '$article', '$sce', '$rootScope', 'commentFactory', 'articleService'];

  function ArticleController($scope, $article, $sce, $rootScope, commentFactory, articleService){
    var vm = this;
    vm.data = [];
    vm.showForm = false;
    vm.addForm = {};
    vm.sce = $sce;

    vm.getComments = getComments;
    vm.sendComment = sendComment;
    vm.toggleForm = toggleForm;
    vm.run = run;
    vm.run();



    function toggleForm(){
      if (vm.showForm) {
        vm.showForm = false;
      } else {
        vm.showForm = true;

        // Создаем ивент сворачивания всех форм
        // и передаем в него id комментария, к которому будет добавлен дочерний коммент
        $rootScope.$emit('comment:closeForm', {id: 'main-form'});
      }
    }


    function sendComment() {
      vm.addForm.rating = 0;
      vm.addForm.avatar = "http://placehold.it/140x100";
      var result = articleService.addComment(null, vm.addForm);

      if(result){
        // Создаем ивент сворачивания всех форм
        $rootScope.$emit('comment:closeForm', {id: null});
      }
    }

    function getComments(){
      vm.data = articleService.comments;
    }

    function run(){
      vm.getComments();

      // Подписываемся на событие перезагрузки данных
      $rootScope.$on('comment:reload', function(){
        vm.getComments()
      });
      // Подписываемся на ивент, в нем смотрим id родительского комментария
      // если он совпадает с текущим, то ничешего не делаем
      $rootScope.$on('comment:closeForm', function (event, data) {
        if (data.id !== 'main-form') {
          vm.showForm = false;
        }
      });
    }
  }

})();
