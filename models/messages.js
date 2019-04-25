module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,150]
        }
      },
      viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false
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
  
    return Message;
  };
  