(function () {
    'use strict';

  angular.module('btest')
    .config(config);

  config.$inject = ['$urlRouterProvider'];

  function config($urlRouterProvider){

    $urlRouterProvider.otherwise('/article');

  }

})();
