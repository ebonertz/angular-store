$(document).ready( function () {


// this isn't tied into our project yet!!

//POST creates a new thing

// $.ajax({
//         type : 'POST',
//         dataType : 'json',
//         url: 'events.json',
//         success : function(data) {
//             console.log(data);
//
//         }
//     });

//DELETE deletes a thing

// $.ajax({
//         type : 'DELETE',
//         dataType : 'json',
//         url: 'events.json',
//         success : function(data) {
//             console.log(data);
//
//         }
//     });

//PUT updates OR creates a new thing

$.ajax({
        type : 'PUT',
        dataType : 'json',
        url: 'events.json',
        data: { 'inCart': false },
        success : function(data) {
            alert("you put a thing!");
        }
});

//GET fetches data

// $.ajax({
//         type : 'GET',
//         dataType : 'json',
//         url: 'events.json',
//         success : function(data) {
//             console.log(data);
//
//         }
// });
});
