(function () {
  'use strict';

  angular.module('btest')
    .controller('CommentController', CommentController);

  CommentController.$inject = ['$scope', '$rootScope', 'articleService', 'parserService'];
  function CommentController($scope, $rootScope, articleService, parserService) {
    var vm = this;
    vm.showForm = false;
    vm.commentData = null;
    vm.addForm = {};

    vm.sendComment = sendComment;
    vm.toggleForm = toggleForm;
    vm.changeRating = changeRating;
    vm.run = run;
    vm.run();

    function sendComment() {
      vm.addForm.rating = 0;
      vm.addForm.avatar = "http://placehold.it/140x100";

      parserService.parseMD(vm.addForm.text)
      var result = articleService.addComment(vm.commentData.id, vm.addForm);

      if(result){
        // Создаем ивент сворачивания всех форм
        $rootScope.$emit('comment:closeForm', {id: null});
      }
    }

    function toggleForm() {
      if (vm.showForm) {
        vm.showForm = false;
      } else {
        vm.showForm = true;

        // Создаем ивент сворачивания всех форм
        // и передаем в него id комментария, к которому будет добавлен дочерний коммент
        $rootScope.$emit('comment:closeForm', {id: vm.commentData.id});
      }
    }

    function changeRating(type) {
      articleService.changeRating(vm.commentData.id, type);
    }

    function run() {
      // Поскольку контроллер дочерний, можно взять данные из родительского scope
      vm.commentData = $scope.$parent.item;

      // Подписываемся на ивент, в нем смотрим id родительского комментария
      // если он совпадает с текущим, то ничешего не делаем
      $rootScope.$on('comment:closeForm', function (event, data) {
        if (data.id !== vm.commentData.id) {
          vm.showForm = false;
        }
      });
    }
  }

})();
