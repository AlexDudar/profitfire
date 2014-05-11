'use strict';

angular.module('ProfitApp.AccountCtrl', [])
  .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', 'categories', '$firebase', function($scope, loginService, syncData, $location, categories, $firebase) {
    syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

    $scope.currentUser = syncData(['users', $scope.auth.user.uid]);

    $scope.currentUserEx = syncData(['users', $scope.auth.user.uid + '/expenses/']);

    $scope.expense = null;

    $scope.categoryItems = categories.list();
    $scope.category = $scope.categoryItems[0];

    $scope.expenses = $scope.currentUserEx;

    $scope.getDate = {
      current: Date.now()
    };

    $scope.addExpense = function(){
      if($scope.expense){
        $scope.currentUserEx.$add({
          expense: $scope.expense.id,
          purpose: $scope.expense.purpose,
          class: $scope.category.title,
          amount: $scope.expense.amount,
          date: $scope.getDate
        });
        $scope.expense = null;
      }
    };

    $scope.removeExpense = function(index){
      $scope.expenses.$remove(index);
    };

    $scope.logout = function() {
      loginService.logout();
    };

    $scope.oldpass = null;
    $scope.newpass = null;
    $scope.confirm = null;

    $scope.reset = function() {
      $scope.err = null;
      $scope.msg = null;
    };

    $scope.updatePassword = function() {
      $scope.reset();
      loginService.changePassword(buildPwdParms());
    };

    function buildPwdParms() {
      return {
        email: $scope.auth.user.email,
        oldpass: $scope.oldpass,
        newpass: $scope.newpass,
        confirm: $scope.confirm,
        callback: function(err) {
          if( err ) {
            $scope.err = err;
          }
          else {
            $scope.oldpass = null;
            $scope.newpass = null;
            $scope.confirm = null;
            $scope.msg = 'Password updated!';
          }
        }
      }
    }

  }]);