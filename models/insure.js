module.exports = function(sequelize, DataTypes) {
  return sequelize.define('insure', {
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
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pay_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: true
    },
    base: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fee_c: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fee_p: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'dsb_insure',
    timestamps: false,
  });
};
