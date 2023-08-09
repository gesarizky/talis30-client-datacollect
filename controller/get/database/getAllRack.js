import Rack from "../../../model/settings/Rack.js";
const getAllRack = async (params) => {
  try {
    const data = await Rack.findAll(params);
    return data;
  } catch (error) {
    throw ("error getAllRack :", error);
  }
};

export default getAllRack;
