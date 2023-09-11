
/**
 *@description constructor data mppt_data 
 */

class InverterModel {
  constructor(data) {
    this.system_dc_side_voltage_mv = data.system_dc_side_voltage_mv;
    this.system_dc_side_total_current_ma = data.system_dc_side_total_current_ma;
    this.power_module_dc_side_voltage_mv = data.power_module_dc_side_voltage_mv;
    this.power_module_dc_side_current_ma = data.power_module_dc_side_current_ma;
    this.power_module_ambient_temperature_mc =
      data.power_module_ambient_temperature_mc;
    this.power_module_status = data.power_module_status;
    this.inverter_status = data.inverter_status;
    this.dc_max_output_voltage_mv = data.dc_max_output_voltage_mv;
    this.dc_min_output_voltage_mv = data.dc_min_output_voltage_mv;
    this.dc_max_output_current_ma = data.dc_max_output_current_ma;
    this.dc_rated_output_power_mw = data.dc_rated_output_power_mw;
    this.ac_a_phase_voltage_mv = data.ac_a_phase_voltage_mv;
    this.ac_b_phase_voltage_mv = data.ac_b_phase_voltage_mv;
    this.ac_c_phase_voltage_mv = data.ac_c_phase_voltage_mv;
    this.ac_a_phase_current_ma = data.ac_a_phase_current_ma;
    this.ac_b_phase_current_ma = data.ac_b_phase_current_ma;
    this.ac_c_phase_current_ma = data.ac_c_phase_current_ma;
    this.ac_frequency_mhz = data.ac_frequency_mhz;
    this.total_active_power_mw = data.total_active_power_mw;
    this.pm_dc_high_voltage_side_voltage_mv =
      data.pm_dc_high_voltage_side_voltage_mv;
    this.pm_dc_high_voltage_side_current_ma =
      data.pm_dc_high_voltage_side_current_ma;
  }
}

export default InverterModel;
