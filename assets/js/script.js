$(function() {

    // variables
    var youtubeID = "";
    var youtubeLink = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeID + '" + frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    var youtubeTest = '<iframe width="560" height="315" src="https://www.youtube.com/embed/V3Tp0X1OlBQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    

    // Pulling Youtube API


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

    var YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    // parameters object
    var parameters = {
     part: 'snippet',
     key: 'AIzaSyBTUrsKGzURto5Z2fG6dHY1KLm-nVVfALA',
     type: 'video'
    };
    
    // create clickable images
    var displayResults = function(data){
     console.log(data)
    //  data.items.forEach(function(item){
       $('.trailer').append(
         '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + data.items[1].id.videoId + '" + frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    //  });
    };
    
    // function to get data
    var getData = function() {
     $.getJSON(YOUTUBE_BASE_URL, parameters, displayResults);
    };

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
            var trailerSearch = userInput + "+trailer";
            console.log(trailerSearch);

            // dynamically replace html
            $(".contentContainer").empty();
            $(".contentContainer").html(searchDisplay);

            // append the movie name
            var title = titleCase(userInput);
                $(".title").text(title);

            // use trailerSearch to pull from the Youtube API
            
            // event listeners
            //  $('img').remove();
             parameters.q = trailerSearch;
             getData();


            // $(".trailer").empty();
            // $(".trailer").html(youtubeTest);

            

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
