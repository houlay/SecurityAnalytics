//on click, set searchTerm's value to user input
$("#searchBtn").click(function() {
  var userChoice = $("#selectTicker").val();
  console.log(userChoice);
  menu(userChoice);
});

function searchStock() {
  event.preventDefault();
  var tickerType = "stock";
  var today = new Date();
  var dd = today.getDate() - 1;
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  var stock = $("#input").val();
  var queryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
    stock +
    "&apikey=2VR5U55WNY713BO3";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(value) {
    console.log(value);
    var assetName = value["Meta Data"]["2. Symbol"];
    var amount = value["Time Series (Daily)"][today]["1. open"] * 100;
    amount = Math.round(amount);
    amount = amount / 100;
    var price = "$" + amount;
    displayResult(assetName, price, tickerType, "");
  });
}

function searchCryptocurrency() {
  event.preventDefault();
  var tickerType = "cryptocurrency";
  var today = new Date();
  var dd = today.getDate() - 1;
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  var cryptocurrency = $("#input").val();
  console.log(cryptocurrency);
  var queryURL =
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" +
    cryptocurrency +
    "&market=USD&apikey=2VR5U55WNY713BO3";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(value) {
    console.log(value);
    var cryptoSymbol = cryptocurrency;
    var assetName = value["Meta Data"]["3. Digital Currency Name"];
    var amount =
      value["Time Series (Digital Currency Daily)"][today]["1a. open (USD)"] *
      100;
    amount = Math.round(amount);
    amount = amount / 100;
    var price = "$" + amount;
    displayResult(assetName, price, tickerType, cryptoSymbol);
  });
}

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
}

//get passed userId from redirect
const urlParams = new URLSearchParams(window.location.search);
const passUid = parseInt(urlParams.get("passUid"));
const passUname = urlParams.get("passUname");
var uName = passUname.replace("%20", " ");

//replace redirect urls to pass userId for this session
$(document).ready(function() {
  $("#navHome").replaceWith(
    "<a class='nav-link' href='user-home.html?passUid=" +
      passUid +
      "&passUname=" +
      passUname +
      "' id='navHome'>Home</a>"
  );
  $("#navSearch").replaceWith(
    "<a class='nav-link' href='index.html?passUid=" +
      passUid +
      "&passUname=" +
      passUname +
      "' id='navSearch'>Search for Assets <span class='sr-only'>(current)</span></a>"
  );
  $("#welcome").text("Welcome, " + uName + "!");
});

function displayResult(name, price, ticker, symbol) {
  const cardDiv = $("<div class='card'>");
  const bodyDiv = $("<div class='card-body'>");
  const removeBtn = $("<button class='btn btn-secondary'>Remove</button>");
  const graphBtn = $(
    "<button class='btn btn-secondary' data-toggle='modal' data-target='#graphModal'>Show Graph</button>"
  );
  const saveBtn = $("<button class='btn btn-secondary'>Track</button>");
  $("#searchResult").append(cardDiv);
  cardDiv.append(bodyDiv);
  bodyDiv.append(
    "<h5 class='card-title'>Asset: " +
      name +
      "</h5> <p class='card-text'>Current price: " +
      price +
      "</p>"
  );
  bodyDiv.append(graphBtn, removeBtn, saveBtn);
  removeBtn.on("click", removeDiv);
  //call saveToPortfolio() when user clicks on the button, pass in userId and assetName
  saveBtn.click(
    { uID: passUid, assetN: name, type: ticker, symb: symbol },
    saveToPortfolio
  );
}

//remove the div once the button is clicked
function removeDiv() {
  $(this)
    .parent()
    .parent()
    .remove();
}

//takes in assetName and store this to user's portfolio on db - austin to do
//you now have userId and assetName populated and ready to use when this function is called
function saveToPortfolio(event) {
  var userIdd = event.data.uID;
  var assetName = event.data.assetN;
  var tickerType = event.data.type;
  var isCrypto = event.data.symb;
  console.log(userIdd, assetName, tickerType, isCrypto);

  if (isCrypto === "") {
    var queryURL = "/api/addticker";
    $.ajax({
      url: queryURL,
      method: "POST",
      dataType: "json",
      data: {
        UserID: userIdd,
        ticker: assetName,
        description: tickerType
      }
    }).then(function(dbReturn) {
      console.log(dbReturn);
      //when added, alert user
      $("#trackSuccess").removeClass("d-none");
      $("#trackSuccess").hide();
      $("#trackSuccess").slideDown(500);
      //hide alert after 2 seconds of showing
      $("#trackSuccess")
        .fadeTo(3000, 500)
        .slideUp(500, function() {
          $("#trackSuccess").slideUp(500);
        });
    });
  } else {
    var queryURL = "/api/addticker";
    $.ajax({
      url: queryURL,
      method: "POST",
      dataType: "json",
      data: {
        UserID: userIdd,
        ticker: isCrypto,
        description: tickerType
      }
    }).then(function(dbReturn) {
      console.log(dbReturn);
      //when added, alert user
      $("#trackSuccess").removeClass("d-none");
      $("#trackSuccess").hide();
      $("#trackSuccess").slideDown(500);
      //hide alert after 2 seconds of showing
      $("#trackSuccess")
        .fadeTo(3000, 500)
        .slideUp(500, function() {
          $("#trackSuccess").slideUp(500);
        });
    });
  }
}
