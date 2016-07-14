(function () {
  'use strict';

  angular.module('btest')
    .controller('CommentController', CommentController);

  CommentController.$inject = ['$scope', '$rootScope'];
  function CommentController($scope, $rootScope) {
    var vm = this;
    vm.showForm = false;

    // Поскольку контроллер дочерний, можно взять данные из родительского scope
    vm.commentData = $scope.$parent.item;

    console.log(vm.commentData);

    vm.toggleForm = toggleForm;


    // Получаем имен, в нем смотрим id родительского комментария
    // если он совпадает с текущим, то ничешего не делаем
    $rootScope.$on('comment:closeForm', function(event, data){
      console.log( data.id )
      if(data.id !== vm.commentData.id){
        vm.showForm = false;
      }

    });


    function toggleForm(){
      if(vm.showForm){
        vm.showForm = false;
      } else {
        vm.showForm = true;

        // Создаем ивент сворачивания всех форм
        // и передаем в него id комментария, к которому будет добавлен дочерний коммент
        $rootScope.$emit('comment:closeForm', { id: vm.commentData.id });
      }
    }
  }

})();
