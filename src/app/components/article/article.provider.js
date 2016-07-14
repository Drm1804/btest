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
          setComments: function (){
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
