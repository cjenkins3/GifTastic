var topics = ["How To Get Away With Murder", "Power", "Insecure", "Shameless", "This Is Us", "House of Cards", "Black-ish", "13 Reasons Why", "Dear White People", "American Horror Story", "Empire"];

    //create topics array buttons
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            
            var c = $("<button>");
            c.addClass("shows");
            c.attr("data-name", topics[i]);
            c.text(topics[i]);
            $("#buttons-view").append(c);
        }
    }
    renderButtons();

$("button").on("click", function() {
    var tvShows = $(this).attr("data-name");
    console.log(tvShows);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShows + "&api_key=7kBd3DP6HpXSUAEPfxFc1SGyegCPY67a";
    console.log(queryURL);
        
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

        var results = response.data;
            // $("#gifs-here").empty();
        
        for (var j = 0; j < results.length; j++) {
            var imageDiv = $("<div>");
            var imageView = results[j].images.fixed_height.url;

            imageDiv.append(imageView);
            var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
            gifImage.attr('data-state', 'still');
            $('#movies-view').prepend(gifImage);
            gifImage.on('click', playGif);

            //Pull ratings for movies
            var rating = results[j].rating;
            var displayRated = $("<p>").text("Rating: " + rating);
            $("#gifs-here").prepend(displayRated);
        }
});

    function playGif() { 
        var state = $(this).attr('data-state');
    
    if (state == "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }

} 

}); 

$("#add-show").on("click", function(event) {
    event.preventDefault();
    if ($("#show-input").val().trim() == "") {
        alert("Search can not be left blank!");
    }
    else { 
        var shows = $("#show-input").val().trim();
        topics.push(shows);
        // $("#show-input").val("");
        renderButtons();
        return false;
    }

});
