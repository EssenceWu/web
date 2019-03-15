module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idcard: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    nation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    birthday: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    acc_prop: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    acc_addr: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    degree: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    marital_status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    work_start_day: {
      type: "VARBINARY(255)",
      allowNull: true
    },
    worker_nation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    live_addr: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    live_postcode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'dsb_user',
    timestamps: false,
  });
};
