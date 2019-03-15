module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log', {
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
    cid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    city_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: true
    },
    search_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idcard: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    month: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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
    total: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    old_balance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    fund_account: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fund_balance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    status: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'dsb_log',
    timestamps: false,
  });
};
