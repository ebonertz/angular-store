$(document).ready( function () {

var cartData;

  $.ajax({
          type : 'GET',
          dataType : 'json',
          url: 'http://localhost:3000/events?name=Led+Zeppelin+@+Lincoln+Theatre',
          headers: {
              contentType: "application/json",
            },
          success : function(data) {
              console.log(data);
              cartData = data;
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
                      }, error: function(request,error){
                        alert("Request: " +JSON.stringify(request));
                      }
              });
          }, error: function(request,error){
            alert("Request: " +JSON.stringify(request));
          }
  });

});
