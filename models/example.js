module.exports = function(sequelize, DataTypes) {
  var Portfolio = sequelize.define("Portfolio", {
    ticker: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    description: DataTypes.TEXT
  });
  return Portfolio;
};

