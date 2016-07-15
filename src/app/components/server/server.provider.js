// Провайдер имитирующий сервер

(function () {
  'use strict';

  angular.module('btest')
    .provider('$server', $server);


  function $server() {

    var url = {
      comments: '/comments.json'
    };

    return {
      $get: function ($constantApp, $q, $http, $timeout) {
        return {
          returnData: function () {
            var dfd = $q.defer();

            $http.get($constantApp.serverUrl + '/' + url.comments)
              .then(function (resp) {
                dfd.resolve(resp.data);
              }, function (resp) {
                console.error('Ошибка получения коментариев');
                dfd.reject(resp);
              });

            return dfd.promise;
          },

          setData: function () {
            var dfd = $q.defer();
            $timeout(function () {
              dfd.resolve()
            });
            return dfd.promise;
          }
        }
      }
    }
  }


})();
