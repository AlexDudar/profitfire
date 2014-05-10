angular.module('myApp.ExpensesCtrl', [])
  .controller('ExpensesCtrl', ['$scope', 'syncData', 'categories', function($scope, syncData, categories) {
    $scope.expense = null;

    $scope.categoryItems = categories.list();
    $scope.category = $scope.categoryItems[0];

    $scope.expenses = syncData('expenses');

    $scope.getDate = {
      current: Date.now()
    };

    $scope.addExpense = function(){
      if($scope.expense){
        $scope.expenses.$add({
          expense: $scope.expense.id,
          purpose: $scope.expense.purpose,
          class: $scope.category.title,
          amount: $scope.expense.amount,
          date: $scope.getDate
        });
        $scope.expense = null;
      }
    };

    console.log($scope.expenses);

    $scope.removeExpense = function(index ){
      $scope.expenses.$remove(index);
    };
  }]);