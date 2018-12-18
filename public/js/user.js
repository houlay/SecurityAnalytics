var userEmail;
var userPass;
var userName;
$(document).ready(function(){
    //get user input when submit btn is clicked
    $("#loginBtn").on("click", getLoginInfo);
    //get user input when sign up btn is clicked
    $("#signUpBtn").on("click", getSignUpInfo);
});

function getLoginInfo() {
    userEmail = $("input[type=email]").val();
    userPass = $("input[type=password]").val();
    console.log(userEmail, userPass);
    processLogin();
};

function getSignUpInfo() {
    userEmail = $("#userEmail").val();
    if ($("#pass1").val() === $("#pass2").val()) {
        userPass = $("#pass1").val();
        console.log(userEmail, userPass);
    } else {
        alert("Passwords do not match! Please check your input again.");
    };    
};

//function to verify user credentials against DB, if true: login; if false: alert error;
function processLogin() {
    console.log("In processLogin");
    console.log(userEmail, userPass);
    var queryURL = "/api/getuserbyemailpassword";
    $.ajax({
    url: queryURL,
    method: "POST",
    dataType: "json",
    data: {
        email: userEmail,
        password: userPass
    }
  }).then(function (value) {
    console.log(value);
  });
};

//function to store new user credentials into DB
function registerUser() {

};