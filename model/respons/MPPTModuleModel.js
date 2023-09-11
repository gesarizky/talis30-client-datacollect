
/**
 * @description constructor MPPT data module
 */

class MPPTModuleModel {
  constructor(data) {
    this.counter = data.counter;
    this.module_number = data.module_number;
    this.module_voltage = data.module_voltage;
    this.module_current = data.module_current;
    this.module_temperature = data.module_temperature;
    this.state_0 = data.state_0;
    this.state_1 = data.state_1;
    this.state_2 = data.state_2;
  }
}

export default MPPTModuleModel;
