(function () {
  'use strict';

  angular.module('btest')
    .controller('CommentController', CommentController);


  function CommentController() {
    var vm = this;
    vm.showForm = false;

    vm.toggleForm = toggleForm;

    function toggleForm(){
      if(vm.showForm){
        vm.showForm = false;
      } else {
        vm.showForm = true;
      }
    }
  }

})();
