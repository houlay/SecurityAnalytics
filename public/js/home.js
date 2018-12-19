var assetName;
var currentPrice;
var userId;
var assetArr = [];
var tickerArr = [];
var uName;

//get passed userId from redirect
const urlParams = new URLSearchParams(window.location.search);
const passUid = urlParams.get('passUid');
const passUname = urlParams.get('passUname');
uName = passUname.replace("%20"," ");
userId = parseInt(passUid);

//replace redirect urls to pass userId for this session
$(document).ready(function() {
    $("#navHome").replaceWith("<a class='nav-link' href='user-home.html?passUid=" + passUid + "&passUname=" + passUname + "' id='navHome'>Home <span class='sr-only'>(current)</span></a>");
    $("#navSearch").replaceWith("<a class='nav-link' href='index.html?passUid=" + passUid + "&passUname=" + passUname + "' id='navSearch'>Search for Assets</a>");
    $("#welcome").text("Welcome, " + uName + "!");
});

//get user portfolio from database, store ticker name and prise into assetName and currentPrice
//if there are multiple tickers, store in an array/object
function readUserPortfolio(userId) {
    var queryURL = "/api/gettickersbyuserid";
    $.ajax({
        url: queryURL,
        method: "POST",
        dataType: "json",
        data: {
            UserID: userId
        }
    }).then(function (dbReturn) {
        console.log(dbReturn);
        console.log(dbReturn[0].Portfolios[i].ticker);
        //need a for loop here to populate assatArr array with API response
        for(var i = 0; i < dbReturn[i].Portfolios.length; i++){            
            assetArr.push(dbReturn[i].Portfolios[i].ticker);
            tickerArr.push(dbReturn[i].Portfolios[i].description);
        };
        console.log(assetArr, tickerArr);
    });
}

function generateList() {
    for(var i = 0; i < tickerArr.length; i++) {
        if (tickerArr[i] === "stock") {
            searchStock(assetArr[i]);
        } else {
            searchCryptocurrency(assetArr[i]);
        };
    };
}

//takes assetName and currentPrice variables and generate HTML to display - chad to do
function displayPortfolio(asset, price) {
    const cardDiv = $("<div class='card'>");
    const bodyDiv = $("<div class='card-body'>");
    const removeBtn = $("<button class='btn btn-secondary'>Remove</button>");
    $("#searchResult").append(cardDiv);
    cardDiv.append(bodyDiv);
    bodyDiv.append("<h5 class='card-title'>Asset: " + asset + "</h5> <p class='card-text'>Current price: " + price + "</p>");
    bodyDiv.append(removeBtn);
    removeBtn.on("click", removeDiv);
}
//remove the div once the button is clicked
function removeDiv(){
    $(this).parent().parent().remove();
}

$(document).ready(function(){
    readUserPortfolio(userId);
})

function searchStock(stock) {
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
  
  function searchCryptocurrency(cryptocurrency) {
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
      displayResult(assetName, price);
    });
};