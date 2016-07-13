(function () {
    'use strict';

  angular.module('btest')
    .provider('$article', $article);

  function $article(){

    var url = {
      comments: '/comments.json'
    };

    return{
      $get: function($q, $http, $constantApp){
        return{
          getComments: function(){
            var dfd = $q.defer();

            $http.get($constantApp.serverUrl + '/' + url.comments)
              .then(function(resp){
                dfd.resolve(resp.data);
              }, function(resp){
                console.error('Ошибка получения коментариев');
                dfd.reject(resp);
              });

            return dfd.promise;
          }
        }
      }
    }
  }

})();
