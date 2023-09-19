/**
 * @description constructor parameter setting
 */
class ParamsModel {
  constructor(dataParam) {
    this.note = dataParam.config.note;
    this.frameName = dataParam.config.frame_name;
    this.totalCell = dataParam.config.total_cell;
    this.uomCurrent = dataParam.config.uom_current;
    this.capacityNew = dataParam.config.capacity_new;
    this.capacityNow = dataParam.config.capacity_now;
    this.uomCapacity = dataParam.config.uom_capacity;
    this.cellNotUsed = dataParam.config.cell_not_used;
    this.uomTotalCell = dataParam.config.uom_total_cell;
    this.maximumCurrent = dataParam.config.maximum_current;
    this.uomTemperature = dataParam.config.uom_temperature;
    this.uomCellVoltage = dataParam.config.uom_cell_voltage;
    this.maximumTemperature = dataParam.config.maximum_temperature;
    this.minimumTemperature = dataParam.config.minimum_temperature;
    this.maximumCellVoltage = dataParam.config.maximum_cell_voltage;
    this.minimumCellVoltage = dataParam.config.minimum_cell_voltage;
    this.maximumDifferentCell = dataParam.config.maximum_different_cell;
    this.totalFrame = dataParam.config.total_frame;
  }
}

export default ParamsModel;
