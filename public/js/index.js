// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
//on click, set searchTerm's value to user input
$("#searchBtn").click(function () {
  var userChoice = $("#selectTicker").val();
  console.log(userChoice);
  menu(userChoice);
});


function searchStock() {
  event.preventDefault();
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = yyyy + "-" + mm + "-" + dd;

  var stock = $("#input").val();
  var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stock + "&apikey=2VR5U55WNY713BO3";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (value) {
    var assetName = value["Meta Data"]["2. Symbol"];
    var amount = value["Time Series (Daily)"][today]["1. open"] * 100;
    amount = Math.round(amount);
    amount = amount / 100;
    var price = "$" + amount;
    displayResult(assetName, price);
  });
};

function searchCryptocurrency() {
  event.preventDefault();
  var today = new Date();
  var dd = today.getDate() - 1;
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = yyyy + "-" + mm + "-" + dd;
  
  var cryptocurrency = $("#input").val();
  console.log(cryptocurrency);
  var queryURL = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + cryptocurrency + "&market=USD&apikey=2VR5U55WNY713BO3";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (value) {
    var assetName = value["Meta Data"]["3. Digital Currency Name"];
    var amount = value["Time Series (Digital Currency Daily)"][today]["1a. open (USD)"] * 100;
    amount = Math.round(amount);
    amount = amount / 100;
    var price = "$" + amount;
    displayResult(assetName, price)
  });
};

function menu(userChoice) {
  switch (userChoice) {
    case "stock":
      searchStock();
      break;

    case "cryptocurrency":
      searchCryptocurrency();
      break;

    default:
      console.log("Invalid Instruction");
      break;
  }
};

function displayResult(name,price) {
  const cardDiv = $("<div class='card'>");
  const bodyDiv = $("<div class='card-body'>");
  const removeBtn = $("<button class='btn btn-secondary'>Remove</button>");
  const graphBtn = $("<button class='btn btn-secondary' data-toggle='modal' data-target='#graphModal'>Show Graph</button>");
  const saveBtn = $("<button class='btn btn-secondary'>Track</button>")
  $("#searchResult").append(cardDiv);
  cardDiv.append(bodyDiv);
  bodyDiv.append("<h5 class='card-title'>Asset: " + name + "</h5> <p class='card-text'>Current price: " + price + "</p>");
  bodyDiv.append(graphBtn, removeBtn, saveBtn);
  removeBtn.on("click", removeDiv);
  saveBtn.on("click", saveToPortfolio);
};

 //remove the div once the button is clicked
function removeDiv(){
  $(this).parent().parent().remove();
}

var userId;
var assetName;


//takes in assetName and store this to user's portfolio on db - austin to do
//you'll need the userId to be able to reference to this user and target its portfolio
function saveToPortfolio (userId, asset) {


  //if success, alert user
  $("#trackSuccess").removeClass('d-none');
  $("#trackSuccess").hide();
  $("#trackSuccess").slideDown(500);
  //hide alert after 2 seconds of showing
  $("#trackSuccess").fadeTo(3000, 500).slideUp(500, function(){
    $("#trackSuccess").slideUp(500);
  });
}

//call saveToPortfolio() when user clicks on the button, pass in userId and assetName - chad to do

