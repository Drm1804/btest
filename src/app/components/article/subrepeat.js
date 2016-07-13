(function () {
    'use strict';

  /**
   * adds recursion to ngRepeat
   */
  angular.module('btest')
    .directive("ngRepeat", function($compile) {
    return {
      scope: {
        children: "=recursionOn"
      },
      compile: function() {
        var rootElement, rhs;
        return function($scope, $element, $attr) {
          var newScope = $scope.$parent;
          if (!rootElement) {
            rootElement = $element.parent().clone();
            rhs = $attr.ngRepeat.match(/^\s*.+\s+in\s+(.*?)\s*?$/)[1];
          }
          if ($scope.children) {
            newScope[rhs] = $scope.children;
            var parentElement = rootElement.clone();
            $element.append(parentElement);
            $compile(parentElement.children())(newScope);
          }
        }
      }
    }
  });

})();
