$(function() {

    // variables

    // functions

        // onclick display trailer and poster using userInput
        $(".submitBtn").on("click", function() {

            // add " trailer" to the userInput
            userInput = $("#userInput").val().trim();
            trailerSearch = userInput + " trailer";

            // use trailerSearch to pull from the Youtube API

            // use userInput to pull from the OMDB API

            // display the Youtube video and poster

        });


});