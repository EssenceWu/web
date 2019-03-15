module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    city_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    prov: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_hot: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    is_open: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '1'
    },
    is_insure: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      defaultValue: '0'
    },
    is_fund: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    pinyin: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    first_letter: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    service_charge: {
      type: DataTypes.STRING(11),
      allowNull: false,
      defaultValue: '69'
    },
    service_charge_add: {
      type: DataTypes.STRING(11),
      allowNull: false,
      defaultValue: '100'
    },
    service_charge_new: {
      type: DataTypes.STRING(11),
      allowNull: false,
      defaultValue: '50'
    },
    service_charge_premium: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    subdl: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lastDate: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    rule: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    month: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    hour: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '12'
    },
    minimum_month_num: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '1'
    },
    is_change_base: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    change_month: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    premium_end_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    service_charge_reserve: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: '0'
    },
    service_charge_add_reserve: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_new_reserve: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_tax: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_one: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_three: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_six: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_year: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_reserve_one: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_reserve_three: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_reserve_six: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_reserve_year: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_assign_area: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    advance_charge: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    advance_start_month: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    advance_end_month: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    is_open_wacai: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    },
    is_calc_byself: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    },
    service_charge_reserve_alone_one: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_reserve_alone_three: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_reserve_alone_six: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    service_charge_reserve_alone_year: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    is_hand: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'dsb_city_new',
    timestamps: false,
  });
};
