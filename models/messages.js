module.exports = function(sequelize, DataTypes) {
    var Messages = sequelize.define("Messages", {
      body: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          len: [1,150]
        }
      },
      viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
    return Messages;
  };
  