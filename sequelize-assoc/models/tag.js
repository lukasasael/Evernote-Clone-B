'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.hasMany(models.NoteTag, {
        foreignKey: 'tag_id',
        as: 'note_tags',
      });

      Tag.belongsToMany(models.Note, {
        through: models.NoteTag,
        as: 'notes',
        foreignKey: 'tag_id',
        timestamps: false,
      });
    }
  }
  Tag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
    tableName: 'tags',
    modelName: 'Tag',
  });
  return Tag;
};