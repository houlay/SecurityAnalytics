var userEmail;
var userPass;

$(document).ready(function(){
    //get user input when submit btn is clicked
    $("#loginBtn").on("click", getLoginInfo);
    //get user input when sign up btn is clicked
    $("#signUpBtn").on("click", getSignUpInfo);
});

function getLoginInfo() {
    var userEmail = $("input[type=email]").val();
    var userPass = $("input[type=password]").val();
    console.log(userEmail, userPass);
};

function getSignUpInfo() {
    var userEmail = $("#userEmail").val();
    if ($("#pass1").val() === $("#pass2").val()) {
        var userPass = $("#pass1").val();
        console.log(userEmail, userPass);
    } else {
        alert("Passwords do not match! Please check your input again.");
    };    
};

//function to verify user credentials against DB, if true: login; if false: alert error;
function processLogin() {

};

//function to store new user credentials into DB
function registerUser() {

};