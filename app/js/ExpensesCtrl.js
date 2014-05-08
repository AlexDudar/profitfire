angular.module('myApp.controllers', [])
  .controller('ExpensesCtrl', ['$scope', 'syncData', function($scope, syncData) {
    $scope.expense = null;

    $scope.expenses = syncData('expenses', 10);

    $scope.getDate = {
      current: Date.now()
    };

    $scope.addExpense = function(){
      if($scope.expense){
        $scope.expenses.$add({
          purpose: $scope.expense.purpose,
          class: $scope.expense.class,
          amount: $scope.expense.amount,
          date: $scope.getDate
        });
        $scope.expense = null;
      }
    };

    $scope.removeExpense = function(expenseIndex){
      $scope.expenses.$remove(expenseIndex);
    }
  }]);