import CMSModel from "./CMSModel.js";

class RMSModel {
  constructor(data) {
    this.cms_data = data.cms_data.map((frame) => new CMSModel(frame));
    this.code = data.code;
    this.UUID_User = data.UUID_User;
    this.rack_sn = data.rack_sn;
    this.rms_sn = data.rms_sn;
  }
}

export default RMSModel;
