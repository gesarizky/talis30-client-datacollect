import InverterModel from "./InverterModel.js";

/**
 *@description constructor data inverter 
 */

class InverterBaseModel {
  constructor(data) {
    this.inverter_data = new InverterModel(data);
    this.code = data.code;
    this.UUID_User = data.UUID_User;
    this.rack_sn = data.rack_sn;
    this.inverter_sn = data.inverter_sn;
  }
}

export default InverterBaseModel;
