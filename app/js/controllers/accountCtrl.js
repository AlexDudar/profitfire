'use strict';

angular.module('ProfitApp.AccountCtrl', [])
  .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', 'categories', '$firebase', function($scope, loginService, syncData, $location, categories, $firebase) {
    syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

    $scope.currentUser = syncData(['users', $scope.auth.user.uid + '/expenses/']);

    var d = new Date();
    var n = d.getMonth();
    console.log(n + 1);


    $scope.expense = null;

    $scope.categoryItems = categories.list();
    $scope.category = $scope.categoryItems[0];

    $scope.expenses = $scope.currentUser;

//    $scope.myitems = _.where($scope.expenses, {'amount': 12});
    $scope.myitems = _.findIndex($scope.expenses, { 'amount': 12 });
    console.log($scope.myitems);

    $scope.getDate = {
      current: new Date()
    };
    $scope.month = $scope.getDate.current.getMonth() + 1;

    $scope.gettingDate = function(){
      var fullDate = new Date();
      var month = fullDate.getMonth();
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

  /*------------ DATE FILTER -------------*/

    var d = new Date();

    var curr_date = d.getDate();
    var curr_month = d.getMonth()+1;
    var curr_year = d.getFullYear();
    console.log(curr_month);


    $scope.dateToday = Date.parse(curr_month + "/" + curr_date + "/" + curr_year);
    $scope.dateRange = "";
//    $scope.dateToday = d;

    $scope.dataModels = [{age:5,name:'John Lennon',eventDate:"1380524400000"},
      {age:12,name:'Nick Young',eventDate:"1406667600000"},
      {age:10,name:'Mike Johnson',eventDate:"1374044400000"},
      {age:15,name:'Lisa Leslie',eventDate:"1335942000000"}
    ];
    $scope.dateFilter = function(column) {


//      $scope.dateFilter = function(column) {
        if(column === 'today') {
          $scope.dateRange = curr_month;

        } else if (column === 'pastWeek') {
          $scope.dateRange = curr_date;
        } else if (column === 'pastMonth') {
          $scope.dateRange = '5';
        } else if (column === 'future') {
          //need logic
        } else {
          $scope.dateRange = "";
        }
//      }
    };


  /*------------ PROFILE -------------*/
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
