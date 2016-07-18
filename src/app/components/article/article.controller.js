// Контроллер является связующим элементом между сервисом и view


(function () {
  'use strict';

  angular.module('btest')
    .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$sce', '$rootScope', 'articleService', 'parserService'];

  function ArticleController( $sce, $rootScope, articleService, parserService) {
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
        $rootScope.$emit('comment:closeForm', {id: 'main-form'});
      }
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
      var result = articleService.addComment(null, vm.addForm);

      if (result) {
        // Создаем ивент сворачивания всех форм
        $rootScope.$emit('comment:closeForm', {id: null});
      }
    }

    /*
     * Публичный метод getComments
     *
     * Метод, забирающий у сервиса articleService данные с комментариями
     *
     * Действия:
     *  получает данные у сервиса articleService
     *
     */
    function getComments() {
      vm.data = articleService.comments;
    }

    /*
     * Публичный метод run
     *
     * Метод, который запускается после загрузки контроллера
     *
     * Действия:
     *   - запускает внутренний метод getComments()
     *   - запускает подпись на событие перезагрузки данных
     *   - запускается подписку на ивент закрытия форм добавления комментариев
     *
     * */

    function run() {
      vm.getComments();

      // Подписываемся на событие перезагрузки данных
      $rootScope.$on('comment:reload', function () {
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
