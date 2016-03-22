// this was suggested as a thing by Mike
// IronTix.controller('MainController', ['$http', '$scope', 'eventService' function($http, $scope, eventService) {
//   console.log('controller.js ran');

// this was a suggested idea from Jasmine on how to get the data to show up when the database is updated:

// $scope.submitExpense = function(){
//       console.log('Submitting expense!!!');
//       $http.post("/expenses.json", $scope.newExpense).then(function(){
//         $http.get("/expenses.json")
//         .then(function(response){
//           $scope.expenses = response.data;
//         })
//       }, function(err){
//         console.log(err);
//         //Server call failed
//       });
//       $scope.newExpense = { };
//     };

IronTix.controller('MainController', ['$http', '$scope', function($http, $scope) {

  console.log('controller.js ran');

  // this, according to Mike, was supposed to replace the ajax call below. the getEvents() function was to be defined in my angular 'service' file.
  // $scope.events = eventService.getEvents();

  $http.get('events.json').success(function(data){
    console.log("storefront page has been populated");
    $scope.event = data;
  });


  // $http.get('http://localhost:3000/cartEvents/').success(function(data){
  //   console.log("cartEvent has been initialized");
  //   $scope.cartEvent = data;
  // });

  // DO AN NG-CLICK thing instead of an onclick function. See here: http://stackoverflow.com/questions/14374440/the-view-is-not-updated-when-the-model-updates-in-angularjs

  $("body").on("click", ".fa-cart-plus", function (event) {
  // function addToCart() {
  //   console.log("addToCart function was called");
    event.stopPropagation();
    // get the ID of the event clicked so we can GET the info for it to display in the cart

    var clickedEventID = $(this).siblings(".storefrontID").html();
    // the thing below GETs a single event and POSTS it to the other array (cartEvents) in the database
    $http.get('http://localhost:3000/events/'+clickedEventID+'/').then(function(result){
      $scope.pickedEvent = result.data;
      console.log("$scope.pickedEvent is :");
      console.log($scope.pickedEvent);
    }).then(function(){
      $http.post('http://localhost:3000/cartEvents/', $scope.pickedEvent).then(function(){
        $http.get('http://localhost:3000/cartEvents/').success(function(data){
          console.log("data is :");
          console.log(data);
        });
      });
    });
  });

  // the above Angular-native $http call does the exact same thing as the nested $ajax calls below -
  //   $.ajax({
  //     type : 'GET',
  //     dataType : 'json',
  //     url: 'http://localhost:3000/events/'+clickedEventID+'/',
  //     headers: {
  //       contentType: "application/json",
  //     },
  //     success : function(data) {
  //       console.log(data);
  //       var cartData = data;
  //       $.ajax({
  //               type : 'POST',
  //               dataType : 'json',
  //               url: 'http://localhost:3000/cartEvents/',
  //               data: cartData,
  //               headers: {
  //                 contentType: "application/json",
  //               },
  //               success : function(data) {
  //                   console.log("you've added the following thing to cartEvents:")
  //                   console.log(data);
  //                   $http.get('events.json').success(function(data){
  //                     console.log("innermost GET did a thing");
  //                     $scope.event = data;
  //                   });
  //               }, error: function(request,error){
  //                 console.log("Request: " +JSON.stringify(request));
  //                 console.log(clickedEventID);
  //               }
  //       });
  //     }, error: function(request,error){
  //       console.log("Request: " +JSON.stringify(request));
  //     }
  //   });
  // });

//this eventlistener should delete an item from the cart
  $("body").on("click", ".fa-times", function () {
    // event.stopPropagation();
    // console.log($(this).siblings(".storefrontID").html());
    // get the ID of the event clicked so we can GET the info for it to be removed from the cart
    var clickedEventID = $(this).siblings(".storefrontID").html();

    $.ajax({
            type : 'DELETE',
            dataType : 'json',
            url: 'http://localhost:3000/cartEvents/'+clickedEventID+'/',
            headers: {
                contentType: "application/json",
              },
            success : function(data) {
                console.log("the event with id " + clickedEventID+ " was removed from the cart!");
                $http.get('http://localhost:3000/cartEvents/').success(function(data){
                  console.log("data is :");
                  console.log(data);
                });
            }, error: function(request,error){
                console.log("this item has already been deleted from cartEvents");
            }
    });
  });

}]);

// IronTix.controller('DeleteController', ['$http', '$scope' function($)]
