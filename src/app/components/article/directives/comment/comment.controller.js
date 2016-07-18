(function () {
  'use strict';

  angular.module('btest')
    .controller('CommentController', CommentController);

  CommentController.$inject = ['$scope', '$rootScope', 'articleService', 'parserService', '$sce'];
  function CommentController($scope, $rootScope, articleService, parserService, $sce) {
    var vm = this;
    vm.showForm = false;
    vm.commentData = null;
    vm.addForm = {};
    vm.sce = $sce;

    vm.sendComment = sendComment;
    vm.toggleForm = toggleForm;
    vm.changeRating = changeRating;
    vm.trustedHtml = trustedHtml;
    vm.run = run;
    vm.run();

    function trustedHtml(data){
      return $sce.trustAsHtml(data)
    }

    /*
     * Публичный метод sendComment
     *
     * Метод, который отправляет данные о новом коментарии в сервис articleService
     *
     * Действия:
     *   - добавляет рейтинг равный нулю (исключительно для теста)
     *   - добавляет аватар (исключительно для теста)
     *   - преобразовывает markdown в html
     *   - отправляет данные о новом коментарии в сервис articleService
     *   - если от articleService вернулось true, создает ивент закрытия всех форм добавления комментариев
     *
     * */

    function sendComment() {
      vm.addForm.rating = 0;
      vm.addForm.avatar = "http://placehold.it/140x100";

      vm.addForm.parsedText = parserService.parseMD(vm.addForm.text);
      var result = articleService.addComment(vm.commentData.id, vm.addForm);

      if(result){
        // Создаем ивент сворачивания всех форм
        $rootScope.$emit('comment:closeForm', {id: null});
      }
    }

    /*
     * Публичный метод toggleForm
     *
     * Метод, скрывающий и открывающий форму добавления комментария
     *
     * Действия:
     *   - скрывает показанный комментарий
     *   - показывает комментарий
     *   - созадет ивент закрытия всех открытых форм добавления комментариев
     *
     * */

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

    /*
     * Публичный метод changeRating
     *
     * Метод, сменяет рейтинг сообщения
     *
     * Действия:
     *   - отправляет в articleService данные о типе изменения рейтинга
     *
     * */

    function changeRating(type) {
      articleService.changeRating(vm.commentData.id, type);
    }

    /*
     * Публичный метод run
     *
     * Метод, который запускается после загрузки контроллера
     *
     * Действия:
     *   - получает данные о текущем кооментарии
     *   - запускается подписку на ивент закрытия форм добавления комментариев
     *
     * */

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
