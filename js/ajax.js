$(document).ready( function () {

// var cartData;

// this eventlistener adds the correct item to the cartEvents array in the database
  $("body").on("click", ".fa-cart-plus", function () {
    console.log($(this).siblings(".storefrontID").html());
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
                            console.log(data);
                            // this innermost GET function is not working
                            $.ajax({
                                    type : 'GET',
                                    dataType : 'json',
                                    url: 'http://localhost:3000/',
                                    headers: {
                                        contentType: "application/json",
                                      },
                                    success : function(data) {
                                        console.log("the innermost function worked");
                                      }, error: function(request,error){
                                        alert("Request: " +JSON.stringify(request));
                                      }
                              });
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

  $("body").on("click", ".fa-times", function () {
    console.log($(this).siblings(".storefrontID").html());
    // get the ID of the event clicked so we can GET the info for it to display in the cart
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


});
