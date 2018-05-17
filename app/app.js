
const app = angular.module('mainApp', []);

let mainController = function($scope, $filter){
  $scope.resultArray = [];
  // 8 top
  $scope.botText = '';
  // 17 bot
  //various local variables
  let tempOp = '';
  let tempRes = '';
  let tempArr = [];
  let counter = 0;
  let secondCounter = 0;
  let thirdCounter = 0;
  //small text along with almost everymathematical calculation appearing
  $scope.botTextFunc = function(x){
    if($scope.resultArray.join('').length > 17){
      return 'Err: Huge Number';
    }
    return $scope.resultArray.join('');
  }
  //making the big text work. tempRes along with || in html through angular transpile
  $scope.topTextFunc = function(x){
      if(tempRes.length > 8){
        tempRes = '0';
        $scope.botText = 'Err: Huge Number';
        thirdCounter++;
      }
    return tempRes || tempOp
  }

  //assigning listeners on all num buttons (and '.');
  let a = document.querySelectorAll("a.num");
  a.forEach(element => {
    element.addEventListener('click', () => {
      if(thirdCounter){
        $scope.resultArray.length = 0;
        $scope.botText = '';
        thirdCounter = 0;
      }
      // making only the math symbol appear on Big screen if you press the symbol button
      if(tempRes == '-' || tempRes == '+' || tempRes == '/' || tempRes == '*' || tempRes == '^' || tempRes == '0'){
        tempRes = '';
        secondCounter = 0;
      }
      else if(secondCounter){
        //reseting the counter if the equal button is pressed and you start typing numbers again;
        secondCounter = 0;
        $scope.refresh();
      }

      tempRes += element.innerHTML;
    })
  });
  // first time an operator gets clicked we ignore any other functionality
  // second we need to evaluate the previous expression to make math
  // more solid. (etc * and / dont work as expected)
  $scope.operator = function(operator) {
    tempRes = operator;
    counter++;
    if(counter > 1 && operator !== '-'){
        // eval whatever is already in the resultArray, store it
        // reset resultArray, and push temp in it
      let temp = (math.eval($scope.resultArray.join(''))).toString();
      $scope.resultArray.length = 0;
      $scope.resultArray.push(temp);
    }
    $scope.resultArray.push(operator);
  }

  // create a block scope var a and assign the resultArray.join() value
  // then create a block scope var result and assing math.eval(a)
  // transform a.toString() and push it to the resete resultArray so it
  // can appear on screen with no errors, tempRes for big Text on screen
  $scope.result = function(){
    secondCounter++;
    let a = $scope.resultArray.join('');
    let result = math.eval(a);
    a = result.toString();
    $scope.resultArray.length = 0;
    $scope.resultArray.push(a);
    tempRes = a;
  }

  //reseting the app
  $scope.refresh = function(){
    tempRes = '';
    $scope.resultArray.length = 0;
    counter = 0;
    secondCounter = 0;
  }

  //functionality of the arrow or delete or backspace button
  $scope.remove = function(){
    if(counter > 1 || secondCounter){
      tempRes = '0';
      $scope.resultArray.length > 1 ? $scope.resultArray.pop() : '';
    } else {
      $scope.resultArray.pop();
      tempRes = tempRes.substring(0,tempRes.length-1);
    }
  }

}

app.controller('mainController', ['$scope', '$filter', mainController]);
