module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the User model a name and email of type STRING
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    User.associate = function(models) {
      // Associating User with Portfolio
      // When an User is deleted, also delete any associated Portfolios
      User.hasMany(models.Portfolio, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  