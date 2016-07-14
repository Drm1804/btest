// Вся логика по работе с данными находится здесь
// Сервис закрывает проблему асинхронных функций
// При обновлении данных сервис генерирует события, оповещая об обновлении другие модули


(function () {
  'use strict';

  angular.module('btest')
    .service('articleService', articleService);

  articleService.$inject = ['$article', '$rootScope', 'commentFactory'];

  function articleService($article, $rootScope, commentFactory) {
    var _this = this;

    _this.comments = [];

    _this.changeRating = changeRating;
    _this.getComments = getComments;
    _this.run = run;
    _this.run();


    /**
     *  Открытый метод changeRating
     *
     *  Аргументы:
     *    id-комментария (string)
     *    type - тип смены рейтинга
     *
     *  Метод обновляет локальные данные - генерирует событие обновления
     *  Метод отправляет данные на сервер
     *
     *  Возвращает новое значение рейтинга
     *
     */

    function changeRating(id, type) {
      var arrId = commentFactory.idToArray(id);
      var path = _this.comments;
      var comment;
      for (var i = 0; i < arrId.length; i++) {
        path = path.comments[arrId[i]];
        comment = path;
      }
      var intRating = parseInt(comment.rating);
      switch (type) {
        case 'plus':
          intRating++;
          break;
        case 'minus':
          intRating--;
          break;
      }
      comment.rating = intRating;
      $rootScope.$emit('comment:reload');


      $article.setComments()
        .then(function(){
          // Делаем что-то  при успешной загрузке
        }, function(){
          // если данные не изменились, пишем пользователю, что произошла ошщибка
          console.error("Houston, We've Got a Problem ");
        })


    }

    function getComments() {
      $article.getComments()
        .then(function (resp) {
          _this.comments = resp;
          $rootScope.$emit('comment:reload');
        })
    }


    function run() {
      _this.getComments();
    }
  }


})();
