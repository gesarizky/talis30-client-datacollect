import MPPTModel from "./MPPTModel.js";

/**
 * @description constructor data mppt
 */

class MPPTBaseModel {
  constructor(data) {
    this.code = data.code;
    this.UUID_User = data.UUID_User;
    this.rack_sn = data.rack_sn;
    this.mppt_sn = data.mppt_sn;
    this.mppt_data = new MPPTModel(data);
  }
}

export default MPPTBaseModel;
