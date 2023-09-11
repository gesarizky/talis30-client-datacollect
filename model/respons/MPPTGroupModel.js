import MPPTModuleModel from "./MPPTModuleModel.js";

/**
 * @description constructor MPPT data Group
 */

class MPPTGroupModel {
  constructor(data) {
    this.counter = data.counter;
    this.group_number = data.group_number;
    this.group_voltage = data.group_voltage;
    this.group_current = data.group_current;
    this.connected_module = data.connected_module;
    this.module_data = data.module_data.map((module) => new MPPTModuleModel(module));
  }
}

export default MPPTGroupModel;
