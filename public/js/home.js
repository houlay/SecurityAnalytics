var assetName;
var currentPrice;
var userId;

//determine userId by reading which user is currently logged on - chad to do


//get user portfolio from database, store ticker name and prise into assetName and currentPrice - austin to do
//if there are multiple tickers, maybe store in an array/object?
//talk to dean about how to read the user from DB, it's referenced by userId
function readUserPortfolio(id) {

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

