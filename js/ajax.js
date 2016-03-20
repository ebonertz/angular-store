$(document).ready( function () {

// var cartData;

// this eventlistener adds the correct item to the cartEvents array in the database
  $("body").on("click", ".fa-cart-plus", function () {
    // console.log($(this).siblings(".storefrontID").html());
    // get the ID of the event clicked so we can GET the info for it to display in the cart
    var clickedEventID = $(this).siblings(".storefrontID").html();



  // the thing below GETs a single event and POSTS it to the other array (cartEvents) in the database
    $.ajax({
            type : 'GET',
            dataType : 'json',
            url: 'http://localhost:3000/events/'+clickedEventID+'/',
            headers: {
                contentType: "application/json",
              },
            success : function(data) {
                console.log(data);
                var cartData = data;
                $.ajax({
                        type : 'POST',
                        dataType : 'json',
                        url: 'http://localhost:3000/cartEvents/',
                        data: cartData,
                        headers: {
                            contentType: "application/json",
                          },
                        success : function(data) {
                            console.log("you've added the following thing to cartEvents:")
                            console.log(data);
                            // this innermost GET function is not working
                            // $.ajax({
                            //         type : 'GET',
                            //         dataType : 'json',
                            //         url: 'http://localhost:3000/',
                            //         headers: {
                            //             contentType: "application/json",
                            //           },
                            //         success : function(data) {
                            //             console.log("the innermost function worked");
                            //           }, error: function(request,error){
                            //             alert("Request: " +JSON.stringify(request));
                            //           }
                            //   });
                        }, error: function(request,error){
                          alert("Request: " +JSON.stringify(request));
                          console.log(clickedEventID);
                        }
                });
            }, error: function(request,error){
              alert("Request: " +JSON.stringify(request));
            }
    });
    event.stopPropagation();

  });

  // this eventListener deletes the item from the cart
  $("body").on("click", ".fa-times", function () {
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
            }, error: function(request,error){
              alert("Request: " +JSON.stringify(request));
            }
    });
  });
  // the thing below DELETEs the object with ID=X in the cartEvents array
  // $.ajax({
  //         type : 'DELETE',
  //         dataType : 'json',
  //         url: 'http://localhost:3000/cartEvents/X/',
  //         headers: {
  //             contentType: "application/json",
  //           },
  //         success : function(data) {
  //             console.log("some stuff was deleted!");
  //         }, error: function(request,error){
  //           alert("Request: " +JSON.stringify(request));
  //         }
  // });

  // I want the thing below to DELETEs everything in the cartEvents array, but it doesn't work!
  // $.ajax({
  //         type : 'DELETE',
  //         dataType : 'json',
  //         url: 'http://localhost:3000/cartEvents',
  //         headers: {
  //             contentType: "application/json",
  //           },
  //         success : function(data) {
  //             console.log("everything was deleted from the cart!");
  //         }, error: function(request,error){
  //           alert("Request: " +JSON.stringify(request));
  //         }
  // });

  // these clickEvents should update the quantity for each cart item and then update the order total on the cart
  var currentQuantity;
  $("body").on("click", ".fa-minus-square", function () {
    console.log($(this).siblings(".lineItem-quantity").html());
    currentQuantity = $(this).siblings(".lineItem-quantity").html();
  });

  $("body").on("click", ".fa-plus-circle", function () {
    console.log($(this).siblings(".lineItem-quantity").html());
    currentQuantity = $(this).siblings(".lineItem-quantity").html();
    if (currentQuantity <= 9){
      //the line below is actually just throwing a '1' after the first number. I need to get the code to think that currentQuantity is a number !
      $(this).siblings(".lineItem-quantity").html(currentQuantity + 1);
      console.log(currentQuantity);
      currentQuantity =+ 1;
      event.stopPropagation();
    } else {
      // do nothing - you can only buy 9 tickets for a single event
    }
  });
});
