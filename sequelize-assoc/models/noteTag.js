'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoteTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NoteTag.belongsTo(models.Note, {
        foreignKey: 'note_id',
        as: 'note'
      });

      NoteTag.belongsTo(models.Tag, {
        foreignKey: 'tag_id',
        as: 'tag'
      });
    }
  }
  NoteTag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    note_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'note_tag',
    modelName: 'NoteTag',
    timestamps: false,
  });
  return NoteTag;
};