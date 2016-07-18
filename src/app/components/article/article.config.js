(function () {
  'use strict';

  angular.module('btest')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    $stateProvider
      .state('article', {
        url: '/article',
        templateUrl: 'app/components/article/article.html'
      });
  }
})();
