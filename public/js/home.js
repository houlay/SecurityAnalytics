var assetName;
var currentPrice;
var userId;
var assetArr;
var uName;

//get passed userId from redirect
const urlParams = new URLSearchParams(window.location.search);
const passUid = urlParams.get('passUid');
const passUname = urlParams.get('passUname');
uName = passUname.replace("%20"," ");

//replace redirect urls to pass userId for this session
$(document).ready(function() {
    $("#navHome").replaceWith("<a class='nav-link' href='user-home.html?passUid=" + passUid + "&passUname=" + passUname + "' id='navHome'>Home <span class='sr-only'>(current)</span></a>");
    $("#navSearch").replaceWith("<a class='nav-link' href='index.html?passUid=" + passUid + "&passUname=" + passUname + "' id='navSearch'>Search for Assets</a>");
    $("#welcome").text("Welcome, " + uName + "!");
});

//get user info by userId
function getUserInfo() {
    userId = parseInt(passUid);
    var queryURL = "/api/gettickersbyuserid";
    $.ajax({
        url: queryURL,
        method: "POST",
        dataType: "json",
        data: {
            userID: 1
        }
    }).then(function (dbExamples) {
        console.log(dbExamples);
        //need a for loop here to populate assatArr array with API response
        // for(var i = 0; i < dbReturn[0].Portfolios.length; i++){            
        //     assetArr.push(dbReturn[0].Portfolios[i].ticker);
        // };
        // console.log(assetArr);
    });

};
//get user portfolio from database, store ticker name and prise into assetName and currentPrice - austin to do
//if there are multiple tickers, maybe store in an array/object?
//talk to dean about how to read the user from DB, it's referenced by userId
function readUserPortfolio(passUid) {

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

