/**
 * @description pengolahan data raw menjadi data olah
 * @param {Array} dataVcell data vcell device batere
 * @param {Object} params sebuah config parameter
 * @returns hasil olah data berupa nilai content dan health 
 */
const cellContent = async (dataVcell, params) => {
  try {
    const minVcell = Math.min(...dataVcell);
    const maxVcell = Math.max(...dataVcell);
    const rangeContent = params.maximumCellVoltage - params.minimumCellVoltage;

    const dataContent = parseFloat(
      (((minVcell - params.minimumCellVoltage) / rangeContent) * 100).toFixed(1)
    ); // ? content
    const rawHealth =
      params.capacityNew / params.capacityNow -
      (maxVcell - minVcell) / params.maximumDifferentCell; // ? health
    const dataHealth =
      rawHealth > 0 ? parseFloat((rawHealth * 100).toFixed(1)) : 0; // if raw health > 0, x with percent, if not, set 0

    return [dataContent, dataHealth];
  } catch (error) {
    return [0, 0];
  }
};

export default cellContent;
