import MPPTGroupModel from "./MPPTGroupModel.js";

/**
 * @description constructor MPPT data System
 */

class MPPTModel {
  constructor(data) {
    this.counter = data.counter;
    this.system_voltage = data.system_voltage;
    this.system_current = data.system_current;
    this.connected_module = data.connected_module;
    if (data.group_data && Array.isArray(data.group_data)) {
      this.group_data = data.group_data.map(
        (group) => new MPPTGroupModel(group)
      );
    } else {
      this.group_data = [];
    }

  }
}

export default MPPTModel;



