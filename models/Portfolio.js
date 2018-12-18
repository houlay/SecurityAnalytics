module.exports = function(sequelize, DataTypes) {
  var Portfolio = sequelize.define("Portfolio", {
    ticker: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    description: DataTypes.TEXT
  });

  Portfolio.associate = function(models) {
    // Associating User with Portfolio
    Portfolio.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Portfolio;
};
