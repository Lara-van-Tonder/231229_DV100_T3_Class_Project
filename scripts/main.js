// ------------------------------------------------------------------------
// Plants Array
// ------------------------------------------------------------------------

const arrPlants = [
  {
    name: "Ficus Tree",
    price: 350,
    description: "Graceful and lush, this charming indoor plant boasts glossy, emerald-green leaves that effortlessly brighten any space.",
    image: "plant1.png", 
    lightAmount: "low", // For FIlter and Sorting: 1. Add filter and sorting properties to objects after main properties are listed.
    addedDate: "2023-03-25", // (For FIlter and Sorting) Date format: year-month-day 
    origin: "Texas" // For API
  },
  {
    name: "White Sprite Succulent",
    price: 200,
    description: "Delicate and captivating, this rare succulent showcases a mesmerizing silver-white hue that gracefully adorns its petite, fleshy leaves.",
    image: "plant2.png",
    lightAmount: "bright",
    addedDate: "2023-05-01",
    origin: "China"
  },
  {
    name: "Snake Plant",
    price: 400,
    description: "Boasting tall, sleek, and sword-like leaves, this botanical marvel adds a touch of modern flair to any setting.",
    image: "plant3.png",
    lightAmount: "low",
    addedDate: "2023-07-04",
    origin: "London"
  },
  {
    name: "Parlour Palm",
    price: 350,
    description: "With its lush, feather-like fronds and compact size, this indoor beauty makes a striking addition to any interior space.",
    image: "plant4.png",
    lightAmount: "low",
    addedDate: "2023-04-29",
    origin: "Pretoria"
  },
  {
    name: "Japanese Maple",
    price: 1200,
    description: "Known for its stunning foliage that transforms with the seasons, this ornamental tree captivates with its delicate, lacy leaves in vibrant shades of red, orange, or gold.",
    image: "plant5.png",
    lightAmount: "bright",
    addedDate: "2023-05-10",
    origin: "Japan"
  },
];

// For FIlter and Sorting:
// 2. Create two new variables
// Create outside of Array/Document Ready to make them global and easily accessible. This also means you can have a FILTER and SORT applied at the same time.
let appliedFilter = ""; // "" Empty string because it's for ALL PLANTS
let appliedSort = "date added"; // "" There is a value applied here because by DEFAULT we want it to sort the plants according to the date added.





// When the document loads
// -----------------------------------------

$(document).ready(function(){

    console.log("Hello");

    // -----------------------------------------
    // Home Page

    // When the document loads, animate the hero image upwards
    $(".hero-image").animate({top: '-=100px'});

    // -----------------------------------------
    // Browse Page

    loadPlants(arrPlants);

}); 





// For FIlter and Sorting:
// 3. Update loadPlants() function

// Load all plants
// -----------------------------------------

function loadPlants(plantsToShow) { // For FIlter and Sorting: Needs to receive array that it's going to use

  // For FIlter and Sorting:
  // 4. Update loadPlants(plantsToShow) function. Can't be a fixed array (arrPlants) because the array is going to constantly be changing through adding or removing values).


  $("#plantsContainer").empty(); // Clear all elements inside the plants cards container so that new filter and sort can be applied when clicked.



  // Loop though plants

  for (let i = 0; i < plantsToShow.length; i++) { // Replace "arrPlants" with updated array "plantsToShow"
    const plant = plantsToShow[i]; // Replace "arrPlants" with updated array "plantsToShow"
    


    // For weather API
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + plant.origin + "&appid=0c8a911e5c7f8e5a03991afe2075de21",
      success: function (data) {
        tempData = data;
        console.log(tempData);
      },
    }).done(function () {
      //// Set Temperature
      //// Will give the result with a higher value

      // $(currentChild).find("#nameText").text(tempData.main.temp);
      
      $(currentChild).find("#originTemp").text("Origin Temp: " + Math.round(tempData.main.temp- 273) + "°C");
     
    });





    // 1: Select the plants container add the plant card to it
    $("#plantsContainer").append($("#plantCardTemplate").html());

    // 2: Create a variable that contains the most recently added plant card
    let currentChild = $("#plantsContainer").children().eq(i);

    // 3: Set the content for the current plant card from the plant array
    $(currentChild).find("#nameText").text(plant.name);
    $(currentChild).find("#priceText").text("R" + plant.price);
    $(currentChild).find("#descriptionText").text(plant.description);
    $(currentChild).find(".card-img-top").attr('src','assets/' + plant.image);

    // 4: Hide the description text from the curent card
    $(currentChild).find("#descriptionText").hide();
    $(currentChild).find("#originTemp").hide();

  };

};





// ------------------------------------------------------------------------
// When a filter or sort option is clicked
// ------------------------------------------------------------------------


// How to setup the filter and sort buttons
// 1. $().click
// 2. $("input[name='filterRadio']").click              -> Use input attribute called "name" given to button in HTML
// 3. $("input[name='filterRadio']").click(function(){ })
// 4. $("input[name='filterRadio']").click(function(){
//      5. Add "value" in HTML to your sorting buttons. You decide what the value is called, no specific name needed, as long as you just know what it's value means.
//      appliedFilter = $(this).attr('value')           -> (this) means select this current filter radio option that I clicked on. ".attr" is for selecting an attribute inside the button and we are selecting "value" that we assigned.
//    })


// For Filter buttons
$("input[name='filterRadio']").click(function(){ 
  appliedFilter = $(this).attr('value'); // Apply one of the two new variables that was created in "Step 2. Create two new variables" at the start

  filterSortPlants(); // Need to add this here so that it actually does the filter and sorting that was setup. Here we do the on click event for the buttons to tell the page website what's going to happen.
});

// For Sort buttons
$("input[name='sortRadio']").click(function(){
  appliedSort = $(this).attr('value'); // Apply one of the two new variables that was created in "Step 2. Create two new variables" at the start

  filterSortPlants(); // Need to add this here so that it actually does the filter and sorting that was setup. Here we do the on click event for the buttons to tell the page website what's going to happen.
});


// For Filter and Sorting: 
// 6. Create a new function

// How to setup this function:
//  1. function filterSortPlants() { 
//    2. Create a new array and this array should contain whatever we filtered or sorted. 
//    let filteredSortedArrPlants = [];              -> "let" to create a new variable. "[]" means that it's an empty array.
//    3. Now we need to filter the plants
//    4. if statement
//  }

function filterSortPlants() {
  


  let filteredSortedArrPlants = [];

  console.log(appliedFilter);
  console.log(appliedSort);



  // Filter Plants

  if (appliedFilter) { // Use the variable that was created for Filter during Step 2.
    // Start with what this new array should contain. = arrPlants.filter() -> This means it's now going to loop through the list of plants.
    // Content within brackets for arrPlants.filter():
    // 1. "plant" -> Single plant it's currently looping through.
    // 2. "=>" ->  Arrow function to replace all of the previous code you should have written for function.
    // 3. "plant.lightAmount" -> This was added in during Step 1 for Filter and Sorting to arrPlants.
    // 4. "==" -> If that is equal to
    // 5. "appliedFilter" -> This contains "low" or "bright"
    filteredSortedArrPlants = arrPlants.filter(plant => plant.lightAmount == appliedFilter);
  } else {
    filteredSortedArrPlants = arrPlants; // Set to GLOBAL arrPlants. Don't change anything, just set it to the initial array we had at the top.
  } // Had to wrap this in an "if" because of our outlier which is "All Plants" because it's "value" is set to empty "".



  // Sort Plants

  if (appliedSort == "low to high") { // "value" that was given in HTML

    // Sort plants from the lowest to highest price
    filteredSortedArrPlants = filteredSortedArrPlants.sort((a, b) => {
      return a.price - b.price;
    });

  } else if (appliedSort == "date added") {

    // Sort plants from the newest to oldest
    filteredSortedArrPlants = filteredSortedArrPlants.sort((a, b) => {
      let da = new Date(a.addedDate);
      let db = new Date(b.addedDate);
    
      return db - da; // Want the highest date first.
    });


    // Sort plants alphabetically
  } else if (appliedSort == "alphabetically") {

    filteredSortedArrPlants = filteredSortedArrPlants.sort((a, b) => {
      return a.name - b.name;
    });

  }



  // 
  // 
  // Need to add Alphabetic Sorting ***
  // 
  // 

  console.log(filteredSortedArrPlants)

  loadPlants(filteredSortedArrPlants); // Use function that was setup to load/display the plants on the website and include array that was created earlier. This will display the plants according to the filter or sort options.

}





// When a plant card is clicked
// -----------------------------------------

$("#plantsContainer").on('click', '.card', function(){

    // Toggle the price & description text
    $(this).find("#priceText").toggle();
    $(this).find("#descriptionText").toggle();
  
    // Resize the image to fit the additional content
    $(this).find(".card-img-top").toggleClass("small");
  
  });





// Remove plant from wishlist (not the most efficient way to do it, but it's my attempt)
// -----------------------------------------

$("#removeButton1").click(function(){
    $(".wishlistRow1").remove();
});


$("#removeButton2").click(function(){
    $(".wishlistRow2").remove();
});


$("#removeButton3").click(function(){
    $(".wishlistRow3").remove();
});


$("#removeButton4").click(function(){
    $(".wishlistRow4").remove();
});


$("#removeButton5").click(function(){
    $(".wishlistRow5").remove();
});



// Tried this but couldn't get it to work:

// $("#removeButton").click(function(){
// $(this).parent("#wishlistRow").remove(); 
// });




$(document).ready(function(){

  $.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=0c8a911e5c7f8e5a03991afe2075de21",
    success: function(data){

      tempData = data

      console.log(data);
    }
  }).done(function(){
    $("#tempData").html(data.main.temp)
  })

})