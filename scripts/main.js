// When the document loads
$(document).ready(function(){

    console.log("Hello");

    // When the document loads, animate the hero image upwards
    $("#hero-image").animate({top: '-=100px'});


    // --------------------------------------------------
    // Browse

    // Hide all description text from the plant cards
    $("#descriptionText").hide();

});

// When a plant card is clicked
$(".card").click(function(){

    // Toggle the price and description text
    $("#priceText").toggle();
    $("#descriptionText").toggle();

    // Resize the image to fit the additional content
    $(".card-img-top").toggleClass("small");

});