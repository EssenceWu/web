module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fund', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    month: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: true
    },
    pay_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    input: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    output: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'dsb_fund',
    timestamps: false,
  });
};
