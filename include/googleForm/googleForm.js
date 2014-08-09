var response;
$.ajax({ type: "GET",   
     url: "include/googleForm/googleForm.html",   
     async: false,
     success : function(text)
     {
         response= text;
     }
});
$('.main > .right').append(response);