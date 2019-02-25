var userEmail;
var userPass;
var userName;
$(document).ready(function() {
  //get user input when submit btn is clicked
  $("#loginBtn").on("click", getLoginInfo);
  //get user input when sign up btn is clicked
  $("#signUpBtn").on("click", getSignUpInfo);
});

function getLoginInfo() {
  userEmail = $("input[type=email]").val();
  userPass = $("input[type=password]").val();
  processLogin();
}

function getSignUpInfo() {
  userEmail = $("#userEmail").val();
  userName = $("#userName").val();
  if ($("#pass1").val() === $("#pass2").val()) {
    userPass = $("#pass1").val();
    registerUser();
  } else {
    alert("Passwords do not match! Please check your input again.");
  }
}

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
  }).then(function(dbReturn) {
    console.log(dbReturn);

    // check for good result set
    if (typeof dbReturn == "undefined" || dbReturn.length < 1) {
      alert(
        "Your input does not match any of our records, please check and try again!"
      );
    } else {
      //login successful, redirect user to their home page
      window.location.href =
        "user-home.html?passUid=" +
        dbReturn[0].id +
        "&passUname=" +
        dbReturn[0].name.replace(/ /g, "%20");
    }
  });
}

//function to store new user credentials into DB
function registerUser() {
  console.log("In registerUser");
  console.log(userEmail, userPass);
  var queryURL = "/api/adduser";
  $.ajax({
    url: queryURL,
    method: "POST",
    dataType: "json",
    data: {
      // name: userName,
      email: userEmail,
      password: userPass,
      name: userName
    }
  }).then(function(dbReturn) {
    //console.log(dbReturn);
    $("#regForm").modal("hide");
    $("#successMsg").modal("toggle");
  });
}
