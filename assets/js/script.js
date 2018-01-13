$(function() {

    // variables
    var config = {
        apiKey: "AIzaSyBTUrsKGzURto5Z2fG6dHY1KLm-nVVfALA",
        authDomain: "group-project1-191804.firebaseapp.com",
        databaseURL: "https://group-project1-191804.firebaseio.com",
        projectId: "group-project1-191804",
        storageBucket: "",
        messagingSenderId: "694904013575"
      };
      firebase.initializeApp(config);
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
