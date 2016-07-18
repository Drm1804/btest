// В идеале этот провайдер должен ходить на сервер
// но сейчас он будет обращаться к провайдеру $server
// который имитирует работу сервера

(function () {
  'use strict';

  angular.module('btest')
    .provider('$article', $article);

  function $article() {


    return {
      $get: function ($q, $server, $timeout) {
        return {

          /*
           * Публичный метод getComments
           *
           * Метод, обарщается к серверу, и забирает от туда данные с комментариями
           *
           * Действия:
           *   - обарщается к серверу, и забирает от туда данные с комментариями
           *
           * Возвращает promise
           * */

          getComments: function () {
            var dfd = $q.defer();
            $server.returnData()
              .then(function (resp) {
                dfd.resolve(resp)
              }, function (resp) {
                dfd.resolve(resp);
              });
            return dfd.promise;
          },

          /*
           * Публичный метод setComment
           *
           * Метод, обаращается к серверу, и отправляет данные о новом комментарии
           *
           * Действия:
           *   - обаращается к серверу, и отправляет данные о новом комментарии
           *
           * Возвращает promise
           * */

          setComment: function (){
            var dfd = $q.defer();
            $server.setData()
              .then(function (resp) {
                dfd.resolve(resp)
              }, function (resp) {
                dfd.resolve(resp);
              });
            return dfd.promise;
          }
        }
      }
    }
  }

})();
