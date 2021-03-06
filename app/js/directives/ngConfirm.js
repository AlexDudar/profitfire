'use strict';

angular.module('ProfitApp.directives', [])
  .directive('ngConfirmClick', [
    function(){
      return {
//       priority: 1,
       restrict: 'A',
        link: function (scope, element, attr) {
          var msg = attr.ngConfirmClick || "Are you sure?";
          var clickAction = attr.confirmedAction;
          element.bind('click',function (event) {
            if ( window.confirm(msg) ) {
              scope.$eval(clickAction)
            }
          });
        }
      };
    }]
  );
