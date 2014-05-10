angular.module('myApp.ExpensesCtrl', [])
  .controller('ExpensesCtrl', ['$scope', 'syncData', 'categories', 'loginService', '$firebase', function($scope, syncData, categories, loginService, $firebase) {

    syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
    $scope.currentUser = syncData(['users', $scope.auth.user.uid]);

    var sampleChatRef = new Firebase('https://amber-fire-9775.firebaseio.com/users/expenses/');
    $scope.hm = $firebase(sampleChatRef);

    $scope.currentUserEx = syncData(['users', $scope.auth.user.uid + '/expenses/']);


    $scope.expense = null;

    $scope.categoryItems = categories.list();
    $scope.category = $scope.categoryItems[0];

    $scope.expenses = syncData('expenses');


    $scope.currentUser = syncData(['users', $scope.auth.user]);
   // console.log($scope.currentUser);

    $scope.getDate = {
      current: Date.now()
    };

    $scope.addExpense = function(){
    //  if($scope.expense){
        $scope.currentUserEx.$add({
          expense: $scope.expense.id,
          purpose: $scope.expense.purpose,
          class: $scope.category.title,
          amount: $scope.expense.amount,
          date: $scope.getDate
        });
        $scope.expense = null;
     // }
    };

    //console.log($scope.expenses);

    $scope.removeExpense = function(index){
      $scope.expenses.$remove(index);
    };
  }]);