// import MPPTGroupModel from "./MPPTGroupModel.js";
// class MPPTModel {
//   constructor(data) {
//     this.counter = data.counter;
//     this.system_voltage = data.system_voltage;
//     this.system_current = data.system_current;
//     this.connected_module = data.connected_module;
//     this.group_data = data.group_data.map((group) => new MPPTGroupModel(group));
//   }
// }

// export default MPPTModel;

class MPPTModel {
  constructor(data) {
    // Pastikan data yang diberikan memiliki properti group_data
    if (data.group_data && Array.isArray(data.group_data)) {
      this.counter = data.counter;
      this.system_voltage = data.system_voltage;
      this.system_current = data.system_current;
      this.connected_module = data.connected_module;

      // Lanjutkan dengan pengolahan data.group_data
      this.group_data = data.group_data.map(
        (group) => new MPPTGroupModel(group)
      );
    } else {
      // Atau, jika group_data tidak ada atau bukan array, beri nilai default
      this.group_data = [];
    }
  }
}

export default MPPTModel;

