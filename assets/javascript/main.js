let nationalParks = ["YellowStone National Park", "Yosemite National Park", "Sequoia & Kings Canyon National Parks", "Zion National Park", "Redwood National Park", "Denali National Park"];

$(document).on("click", ".parks-btn", function () {


    let parks = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + parks + "&api_key=ikIZB8f33x2ckXMCTYBI0dfv3N4TrnQG&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let results = response.data;

        for (let i = 0; i < results.length; i++) {
            let giphDiv = $("<div class='parks'>");
            let p = $("<p>").text("Rating: " + results[i].rating);
            let image = $("<img class='gif'>").attr("src", results[i].images.fixed_height_still.url);

            giphDiv.append(image);
            giphDiv.append(p);
            giphDiv.append(image);

            $("#nationalParks").prepend(giphDiv);

            console.log(response);
            console.log(queryURL);
            $("#subtractNP").hide();
        }

    })
})

function buttons(array) {
    $("#npBtn").empty();
    for (let i = 0; i < array.length; i++) {
        let btn = $("<button>");
        btn.addClass("parks-btn");
        btn.attr("data-name", array[i]);
        btn.text(array[i]);
        $("#npBtn").append(btn);
        $("#subtractNP").hide();
        
    }
}
$(document).ready(function(){
    $("#subtractNP").hide();
    $("#addNP").on("click", function(event) {
        event.preventDefault();

        let userInput = $("#nationalParksInput").val().trim();
        console.log(userInput, userInput.length);

        //buttons(nationalParks);
        $("form").trigger("reset");
        if (userInput.length > 0) {
            nationalParks.push(userInput);
            buttons(nationalParks);


        } else {
            $("#subtractNP").show();
        }

    })
    $("body").on("click", ".gif", function() {
        let src = $(this).attr("src");
        if($(this).hasClass("playing")) {
            $(this).attr("src", src.replace(/\.gif/i, "_s.gif"))
            $(this).removeClass("playing");
        } else {
            $(this).addClass("playing");
            $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
        }
    });
})


buttons(nationalParks);
