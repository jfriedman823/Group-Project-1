$(function() {

    // variables

    // html code chunks
    var homeDisplay = `
        <div class="jumbotron jumbotron-fluid header">
            <div class="container">
                <h1 class="display-4">Trailer Park</h1>
                <p class="lead">Search for your favorite film.</p>
            </div>
        </div>
    `

    var searchDisplay = `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4 title"></h1>
                <div class="trailer"></div>
                <div class="poster"></div>
            </div>
        </div>
    `

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

        // toUpperCase
        function titleCase(str) {
            str = str.toLowerCase().split(' ');
       
            for(var i = 0; i < str.length; i++){
                 str[i] = str[i].split('');
                 str[i][0] = str[i][0].toUpperCase();
                 str[i] = str[i].join('');
            }
            return str.join(' ');
        };


        // onclick return to the home page
        $(".homeBtn").on("click", function(event) {
            event.preventDefault();

            // dynamically replace html
            $(".contentContainer").empty();
            $(".contentContainer").html(homeDisplay);
        });



        // onclick display trailer and poster using userInput
        $(".submitBtn").on("click", function(event) {
            event.preventDefault();


            // add " trailer" to the userInput
            var userInput = $("#userInput").val().trim();
            var trailerSearch = userInput + " trailer";

            // dynamically replace html
            $(".contentContainer").empty();
            $(".contentContainer").html(searchDisplay);

            // append the movie name
            var title = titleCase(userInput);
                $(".title").text(title);

            // use trailerSearch to pull from the Youtube API

            // use userInput to pull from the OMDB API
            var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=9f68b70";

                 $.ajax ( {
                     url: queryURL,
                    method: 'GET'
                }).done(function(response) {
                    
                    // Empty the poster div
                    $(".poster").empty();

                     $("#movie-view").text(JSON.stringify(response));
                     console.log(response);

                     // Retrieving the URL for the image
                     var imgURL = response.Poster;

                     // Creating an element to hold the image
                     var image = $("<img>").attr("src", imgURL);

                    //  Display the poster
                     $(".poster").html(image);


                 });

        });


});
