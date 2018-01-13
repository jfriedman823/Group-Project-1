$(function() {

    // variables

    // functions

        // scroll animate
        // window.sr = ScrollReveal();
        //
        //     //animate header
        //     sr.reveal(".header", {
        //         duration: 2000,
        //         origin: "bottom"
        //     });
        //
        //     //animate search bar
        //     sr.reveal(".searchBar", {
        //         duration: 4000,
        //         origin: "bottom"
        //     });



        // onclick display trailer and poster using userInput
        $(".submitBtn").on("click", function(event) {
            event.preventDefault();


            // add " trailer" to the userInput
            var userInput = $("#userInput").val().trim();
            var trailerSearch = userInput + " trailer";

            // use trailerSearch to pull from the Youtube API

            // use userInput to pull from the OMDB API

            var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

                 $.ajax ( {
                     url: queryURL,
                    method: 'GET'
                }).done(function(response) {
                     $("#movie-view").text(JSON.stringify(response));
                     console.log(response);

                     // Retrieving the URL for the image
                     var imgURL = response.Poster;

                     // Creating an element to hold the image
                     var image = $("<img>").attr("src", imgURL);

                     $(".poster").html(image);

                     // Appending the image
                     //movieDiv.append(image);

                 });

            // display the Youtube video and poster

        });


});
