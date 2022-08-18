'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });

      Note.hasMany(models.NoteTag, {
        foreignKey: 'note_id',
        as: 'note_tag',
        timestamps: false,
      });
      
      Note.belongsToMany(models.Tag, {
        through: models.NoteTag,
        as: 'tags',
        foreignKey: 'note_id',
        timestamps: false,
      });
    }
  }
  Note.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    category_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
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
    tableName: 'notes',
    modelName: 'Note',
  });
  return Note;
};