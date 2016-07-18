// Вся логика по работе с данными находится здесь
// Сервис закрывает проблему асинхронных функций
// При обновлении данных сервис генерирует события, оповещая об обновлении другие модули


(function () {
  'use strict';

  angular.module('btest')
    .service('articleService', articleService);

  articleService.$inject = ['$article', '$rootScope', 'commentFactory', 'parserService'];

  function articleService($article, $rootScope, commentFactory, parserService) {
    var _this = this;

    _this.comments = [];

    _this.changeRating = changeRating;
    _this.getComments = getComments;
    _this.addComment = addComment;
    _this.run = run;
    _this.run();



    /**
     *  Приватный метод метод parseMDComment
     *
     *  Аргументы:
     *    data - JSON - объект с данными
     *
     *  Рекурсивная функция, которая находит в переданном объекте свойство 'comments', проходит по нему циклом,
     *  в каждом объекте берет текст из свойства 'text', после чего парсит его в html.
     *  Далее ищет в этом объекте свойство 'comments', если оно имеется, то вызывает сама себя, и передает объект со
     *  свойством 'comments'
     *
     *
     *    Возвращает true
     *
     */

    function parseMDComment(data){
      var parsedComments = [];
      for(var item in data.comments){
        data.comments[item].parsedText = parserService.parseMD(data.comments[item].text)
        if(data.comments[item].hasOwnProperty('comments')){
          parseMDComment(data.comments[item])
        }
      }

      return parsedComments

    }

    /**
     *  Открытый метод addComment
     *
     *  Аргументы:
     *    father - id(string), родительского комментария
     *    commentData - данные коментария
     *      - Имя пользователя
     *      - email пользователя
     *      - Сообщение Markdown
     *
     *
     *    Возвращает true
     *
     */

    function addComment(father, commentData) {
      var comment;

      if(father){
        var arrFatherId = commentFactory.idToArray(father);
        var path = _this.comments;
        for (var i = 0; i < arrFatherId.length; i++) {
          path = path.comments[arrFatherId[i]];

        }
        comment = path;
      } else {
        comment = _this.comments
      }

      var newId = getNewId();

      if(comment.hasOwnProperty('comments')){
        comment.comments[newId] = commentData;
      } else {
        comment.comments = {};
        comment.comments[newId] = commentData;
      }


      $article.setComments(_this.comments)
        .then(function(){
          // Делаем что-то  при успешной загрузке
        }, function(){
          // если данные не изменились, пишем пользователю, что произошла ошщибка
          console.error("Houston, We've Got a Problem ");
        });

      return true;
    }


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
      for (var i = 0; i < arrId.length; i++) {
        path = path.comments[arrId[i]];

      }
      var comment = path;
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


      $article.setComments(_this.comments)
        .then(function(){
          // Делаем что-то  при успешной загрузке
        }, function(){
          // если данные не изменились, пишем пользователю, что произошла ошщибка
          console.error("Houston, We've Got a Problem ");
        });


    }

    /**
     *  Приватный метод changeRating
     *
     *  Метод генерирует id комментария из 4 буквоцифр
     *
     *  Возвращает сгенерированный id
     *
     */

    function getNewId () {
      return Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(4, 10)));
    }

    function getComments() {
      $article.getComments()
        .then(function (resp) {
          _this.comments = resp;
          parseMDComment(_this.comments)
          $rootScope.$emit('comment:reload');
        })
    }


    function run() {
      _this.getComments();
    }
  }


})();
