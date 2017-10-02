var giphyButton = ["Dog", "Homework", "Giraffe", "Seth Rogen","tom brady"];

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#giphybutton").empty();
        console.log("empty div")

        // Looping through the array of movies
        for (var i = 0; i < giphyButton.length; i++) {
          console.log("for loop")

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("giphytext");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", giphyButton[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(giphyButton[i]);
          // Adding the button to the HTML
          $("#giphybutton").append(a);
        }
      }



      // This function handles events where one button is clicked
      

      // Calling the renderButtons function at least once to display the initial list of movies
      $(document).ready(function(){

renderButtons();
$("#add-giphy").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newGiphy = $("#giphy-input").val().trim();
        // The movie from the textbox is then added to our array
        giphyButton.push(newGiphy);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
        $("#giphy-input").val("");
      });





$("body").on("click",".giphytext", function(event) {

  $("#giphyouput").empty();
 var giphyText = $(this).attr("data-name");

 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphyText + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url:queryURL,
        method:"GET"
      })
      .done(function(response){

          console.log(response)
           var results=response.data

            for (i=0;i<results.length;i++){

              console.log(results[i].images.fixed_height.url);
              var p = $("<p>").text("Rating: " + results[i].rating);
              var images=$('<img>');
              images.addClass("gifs")

              images.attr("src",results[i].images.fixed_height_still.url);
              images.attr("data-still",results[i].images.fixed_height_still.url);
              images.attr("data-state","still");
              images.attr("data-animate",results[i].images.fixed_height.url);
            
              $("#giphyoutput").prepend(images);
              $("#giphyoutput").prepend(p);

            }


      });

});
$("body").on("click",".gifs", function(event) {

        var state = $(this).attr("data-state");

        if(state==="still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state","still")
        }
});

      });


      //renderButtons();