$(function() {

    // variables
    var youtubeID = "";
    var youtubeLink = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeID + '" + frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    var youtubeTest = '<iframe width="560" height="315" src="https://www.youtube.com/embed/V3Tp0X1OlBQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';


    // html code chunks
    var searchDisplay = `
        <div class="jumbotron jumbotron-fluid trailerDisplay" id="searchDisplay">
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
                        <div class="row">
                            <div class="rated"></div>
                        </div>
                    </div>
            </div>
    `

    // scroll animate
    window.sr = ScrollReveal();

        //animate header
        sr.reveal(".pageTitle", {
            duration: 2000,
            origin: "bottom"
        });

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


    // display of movies currently in theaters
    var nowPlayingQueryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=cf951ca687c6c8d3aa6e201a85673392&language=en-US&page=1";

    $.ajax ( {
        url: nowPlayingQueryURL,
        method: 'GET'
        }).done(function(response) {
    
        // $(".trendingContainer").text(JSON.stringify(response));
        console.log(response.results);
    
        for (i = 0; i < response.results.length; i++) {
            var nowPlayingPoster = $("<img>");
            nowPlayingPoster.addClass("posters");
            nowPlayingPoster.attr("id", response.results[i].title);
            nowPlayingPoster.attr("src", "https://image.tmdb.org/t/p/w300//" + response.results[i].poster_path);
            $(".nowContainerInner").append(nowPlayingPoster);
        };
    
    });



    // display of movies coming soon
    var trendingQueryURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=cf951ca687c6c8d3aa6e201a85673392&language=en-US&page=1";

    $.ajax ( {
        url: trendingQueryURL,
        method: 'GET'
        }).done(function(response) {
    
        // $(".trendingContainer").text(JSON.stringify(response));
        console.log(response.results);
    
        for (i = 0; i < response.results.length; i++) {
            var comingPoster = $("<img>");
            comingPoster.addClass("posters");
            comingPoster.attr("id", response.results[i].title);
            comingPoster.attr("src", "https://image.tmdb.org/t/p/w300//" + response.results[i].poster_path);
            $(".comingContainerInner").append(comingPoster);
        };
    
    });


    // display of tv shows airing today
    var airingTVQueryURL = "https://api.themoviedb.org/3/tv/airing_today?api_key=cf951ca687c6c8d3aa6e201a85673392&language=en-US&page=1";

    $.ajax ( {
        url: airingTVQueryURL,
        method: 'GET'
        }).done(function(response) {
    
        // $(".trendingContainer").text(JSON.stringify(response));
        console.log(response.results);
    
        for (i = 0; i < response.results.length; i++) {
            var airingTVPoster = $("<img>");
            airingTVPoster.addClass("posters");
            airingTVPoster.attr("id", response.results[i].name);
            airingTVPoster.attr("src", "https://image.tmdb.org/t/p/w300//" + response.results[i].poster_path);
            $(".airingContainerInner").append(airingTVPoster);
        };
    
    });    


    // display of trending tv shows
    var trendingTVQueryURL = "https://api.themoviedb.org/3/tv/popular?api_key=cf951ca687c6c8d3aa6e201a85673392&language=en-US&page=1";

    $.ajax ( {
        url: trendingTVQueryURL,
        method: 'GET'
        }).done(function(response) {
    
        // $(".trendingContainer").text(JSON.stringify(response));
        console.log(response.results);
    
        for (i = 0; i < response.results.length; i++) {
            var trendingTVPoster = $("<img>");
            trendingTVPoster.addClass("posters");
            trendingTVPoster.attr("id", response.results[i].name);
            trendingTVPoster.attr("src", "https://image.tmdb.org/t/p/w300//" + response.results[i].poster_path);
            $(".trendingTVContainerInner").append(trendingTVPoster);
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
        var OMDBqueryURL = "https://www.omdbapi.com/?apikey=9f68b70&s&y=&plot=short&t=" + userInput;
        
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
            var rated = response.Rated;
        
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
            $(".rated").html("<b>Rated:</b> " + rated);
        
            // empty search bard
            $("form").trigger("reset");

            // jump to trailer display
            $('html,body').animate({
                scrollTop: $("#searchDisplay").offset().top
                }, 800);
        
        });
    }


    // onclick display trailer and poster using userInput
    $(".submitBtn").on("click", function(event) {
        event.preventDefault();
        userSearch();
        });
       
    
    // onclick  posters
    $(document).on("click", ".posters", function() {
        var trendingSearch = ($(this).attr("id"));
        var inputTrendingSearch = $("#userInput");
        inputTrendingSearch.val(trendingSearch);
        userSearch();
    });



    // onclickpage jump
    $(".home").on("click", function() {
        $('html,body').animate({
            scrollTop: $("#home").offset().top
        }, 1000);
    })

    $(".about").on("click", function() {
        $('html,body').animate({
            scrollTop: $("#bottom").offset().top
            }, 1000);
    })

    $(".nowPlaying").on("click", function() {
        $('html,body').animate({
            scrollTop: $("#nowPlaying").offset().top - 80
        }, 1000);
    })

    $(".comingSoon").on("click", function() {
        $('html,body').animate({
            scrollTop: $("#comingSoon").offset().top - 80
        }, 1000);
    })

    $(".airing").on("click", function() {
        $('html,body').animate({
            scrollTop: $("#airing").offset().top - 80
        }, 1000);
    })

    $(".trending").on("click", function() {
        $('html,body').animate({
            scrollTop: $("#trending").offset().top - 80
        }, 1000);
    })

});
