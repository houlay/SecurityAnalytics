var db = require("../models");

module.exports = function(app) {
// takes the User table email, example "test@test.com 
// returns everthing for the user. if this returns an empty array
// then the user does not exist so do a post to "/api/adduser"
  app.post("/api/getuserbyemailpassword", function(req, res) {
    console.log("req = " + req.body.email);
    db.User.findAll({
        where: {
        email: req.body.email,
        password: req.body.password
      },
      include: [db.Portfolio]
    }).then(function(dbReturn) {
      res.json(dbReturn);
    });
  });

// takes the User table id or Portfolio table UesrId and 
// returns everthing for the user. 
app.post("/api/gettickersbyuserid", function(req, res) {
  
  db.Portfolio.findAll({
      where: {
      UserID: req.body.UserID
    },
    include: [db.User]
  }).then(function(dbExamples) {
    res.json(dbExamples);
  });
});

  // Creates a new User record with email and name.
  // after this use /api/addticker with UserId to add tickers
app.post("/api/adduser", function(req, res) {
    console.log(req.query.email);
    db.User.create(
      {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
        
      })
      .then(function(dbExample) {
    res.json(dbExample);
  });
});


  // Create a new Portfolio record
app.post("/api/addticker", function(req, res) {
    console.log(req.query.id);
    db.Portfolio.create(
      {
        UserId: req.query.id,
        ticker: req.query.ticker
        // price: 10.94,
        // description: "description"
      })
      .then(function(dbExample) {
    res.json(dbExample);
  });
});
   // Delete a single ticker by id
   // use Portfolio id not (User UsreId will delete all Portfolio records for the user)
  app.delete("/api/deleteticker", function(req, res) {
     console.log("id=  " + req.query.id);
    db.Portfolio.destroy({
       where: 
      { 
        id: req.query.id 
      } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

   // Delete a single user by id
   app.delete("/api/deleteuser", function(req, res) {
    console.log("id=  " + req.query.id);
   db.User.destroy({
      where: 
     { 
       id: req.query.id 
     } }).then(function(dbExample) {
     res.json(dbExample);
   });
 });
};
