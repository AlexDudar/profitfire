'use strict';



angular.module('ProfitApp.AccountCtrl', [])
  .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', 'categories', '$firebase', function($scope, loginService, syncData, $location, categories, $firebase) {
    syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

    $scope.currentUser = syncData(['users', $scope.auth.user.uid + '/expenses/']);

//    console.log($scope.auth.user.uid);
    $scope.expense = null;

    $scope.categoryItems = categories.list();
    $scope.category = $scope.categoryItems[0];

    $scope.expenses = $scope.currentUser;

    $scope.getDate = {
      current: Date.now()
    };

    $scope.addExpense = function(){
      if($scope.expense){
        $scope.currentUser.$add({
          expense: $scope.expense.id,
          purpose: $scope.expense.purpose,
          class: $scope.category.title,
          amount: $scope.expense.amount,
          date: $scope.getDate
        });
        $scope.expense = null;
      }
    };


    $scope.editorEnabled = false;

    $scope.enableEditor = function(id) {
//      $scope.editorEnabled = true;
//      $scope.editorEnabled = $scope.expenses.indexOf(id);
   //   $scope.expenseCopy = angular.copy(id);    //dont need
    };

    $scope.save = function(id) {
     // var nameRef = syncData(['users', $scope.auth.user.uid + '/expenses/' + id]);
      $scope.currentUser.$save();
      $scope.editorEnabled = false;
    };

      $scope.disableEditor = function(id) {
//
//        $scope.expenseCopy[$scope.editorEnabled] = false;
//        $scope.amount = 'hui';
//        $scope.editorEnabled = false;
      };


    $scope.removeExpense = function(id){
      $scope.expenses.$remove(id);
    };

//    $scope.$watch('expenses', function() {
//      var Total = 0;
//
//      $scope.expenses.forEach(function(expense) {
////        Total += expense.getTotal();
//        Total += expense.amount;
//      });
//
//    }, true);

//    $scope.total = function() {
//      var total = 0;
//      angular.forEach($scope.expenses, function(expense) {
//        console.log($scope.expenses.amount);
//        //total += expense.amount;
//
//
//      });
//
//      return total;
//    };

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
