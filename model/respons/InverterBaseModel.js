import InverterModel from "./InverterModel.js";
class InverterBaseModel {
  constructor(data) {
    this.inverter_data = new InverterModel(data);
    this.code = data.code;
    this.UUID_User = data.UUID_User;
    this.rack_sn = data.rack_sn;
  }
}

export default InverterBaseModel;
