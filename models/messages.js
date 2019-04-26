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
  
    // TODO: ? Maybe associate this in the future ?
    // Post.associate = function(models) {
    //   // We're saying that a Post should belong to an Author
    //   // A Post can't be created without an Author due to the foreign key constraint
    //   Post.belongsTo(models.Author, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return Messages;
  };
  