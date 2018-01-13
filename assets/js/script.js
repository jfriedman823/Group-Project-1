$(function() {

    // variables

    // functions

        // scroll animate
        window.sr = ScrollReveal();

            //animate header
            sr.reveal(".header", {
                duration: 2000,
                origin: "bottom"
            });

            //animate search bar
            sr.reveal(".searchBar", {
                duration: 4000,
                origin: "bottom"
            });
            
                

        // onclick display trailer and poster using userInput
        $(".submitBtn").on("click", function() {

            // add " trailer" to the userInput
            userInput = $("#userInput").val().trim();
            trailerSearch = userInput + " trailer";

            // use trailerSearch to pull from the Youtube API

            // use userInput to pull from the OMDB API

            var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

                 $.ajax ( {
                     url: queryURL,
                    method: 'GET'
                }).done(function(response) {
                     $("#movieResults").text(JSON.stringify(response));
                     console.log(response);

                     function response(movies)
                     {
                       console.log(movies);

                       for (var m in movies)
                       {
                         var movie = movies[m];
                         var title = movie.title;
                         var rating = movie.imdbRating;
                         var poster =
                       }
                     }

                 });

            // display the Youtube video and poster

        });


});
