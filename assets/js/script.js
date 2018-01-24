$(function() {

    // variables
    var youtubeID = "";
    var youtubeLink = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeID + '" + frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    var youtubeTest = '<iframe width="560" height="315" src="https://www.youtube.com/embed/V3Tp0X1OlBQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';


    // html code chunks
    var searchDisplay = `
        <div class="jumbotron jumbotron-fluid trailerDisplay">
            <div class="container contentDisplay">
                <h1 class="display-4 title"></h1>
                <div class="row searchContent">
                    <div class="col-sm-4">
                        <div class="poster"></div>
                    </div>
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="trailer"></div>
                        </div>
                        <div class="row">
                            <div class="actors"></div>
                        </div>
                        <div class="row">
                            <div class="MovieRating"></div>
                        </div>
                    </div>
            </div>
    `

    // scroll animate
    window.sr = ScrollReveal();

        //animate header
        sr.reveal(".card", {
            duration: 2000,
            origin: "bottom"
        });

        //animate search bar
        sr.reveal(".trendingContainerOuter", {
            duration: 4000,
            origin: "bottom"
        });


    // display of popular movies
    var trendingQueryURL = "https://api.themoviedb.org/3/movie/popular?api_key=cf951ca687c6c8d3aa6e201a85673392&language=en-US&page=1";

    $.ajax ( {
        url: trendingQueryURL,
        method: 'GET'
        }).done(function(response) {
    
        // $(".trendingContainer").text(JSON.stringify(response));
        console.log(response.results);
    
        for (i = 0; i < response.results.length; i++) {
            var trendingPoster = $("<img>");
            trendingPoster.addClass("trendingPoster");
            trendingPoster.attr("id", response.results[i].title);
            trendingPoster.attr("src", "http://image.tmdb.org/t/p/w300//" + response.results[i].poster_path);
            $(".trendingContainerInner").append(trendingPoster);
        };
    
    });


    // call on Youtube API
    var YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    var parameters = {
        part: 'snippet',
        key: 'AIzaSyBTUrsKGzURto5Z2fG6dHY1KLm-nVVfALA',
        type: 'video'
    };
    
    var displayResults = function(data){
        console.log(data)
        $('.trailer').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + data.items[1].id.videoId + '" + frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    };
    
    var getData = function() {
        $.getJSON(YOUTUBE_BASE_URL, parameters, displayResults);
    };


    // user search function
    function userSearch() {
                    
        // grab the user input
        var userInput = $("#userInput").val().trim();

        // dynamically replace html
        $(".trailerContainer").empty();
        $(".trailerContainer").html(searchDisplay);
        
        // use userInput to pull from the OMDB API
        var OMDBqueryURL = "http://www.omdbapi.com/?apikey=9f68b70&s&y=&plot=short&t=" + userInput;
        
        $.ajax ( {
            url: OMDBqueryURL,
            method: 'GET'
            }).done(function(response) {
        
            // Empty the poster div
            $(".poster").empty();
            console.log(response);
        
            // Retrieve url
            var imgURL = response.Poster;
        
            // grab info and place in variables
            var image = $("<img>").attr("src", imgURL);
            var title = response.Title;
            var actors = response.Actors;
            var imdbRating = response.imdbRating;
            //  var rtRating = response.Ratings[1].value;
            //  var mcRating = response.Ratings[3].value;
            var plot = response.Plot;
        
            // add trailer for the Youtube search
            var trailerSearch = title + "+trailer";
            console.log(trailerSearch);
            parameters.q = trailerSearch;
            getData();
        
        
            // Display the variables
            $(".poster").html(image);
            $(".title").text(title);
            $(".MovieRating").html("<b>Rating:</b> " + imdbRating);
            $(".actors").html("<b>Actors:</b> " + actors);
            $(".plot").html("<b>Plot:</b> " + plot);
        
            // empty search bard
            $("form").trigger("reset");
        
        });
    }


    // onclick display trailer and poster using userInput
    $(".submitBtn").on("click", function(event) {
        event.preventDefault();
        userSearch();
        });
       
    
    // onclick trending posters
    $(document).on("click", ".trendingPoster", function() {
        var trendingSearch = ($(this).attr("id"));
        var inputTrendingSearch = $("#userInput");
        inputTrendingSearch.val(trendingSearch);
        userSearch();
    });

});
