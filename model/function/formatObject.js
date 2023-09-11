
/**
 * @description destructuring object supaya menghapus // dan /n
 * @param {*} obj data yang akan diubah
 * @param {*} indent 
 * @returns 
 */

const formatObject = (obj, indent = 0) => {
  const spaces = " ".repeat(indent);
  const lines = [];

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      lines.push(`${spaces}${key}: [`);
      obj[key].forEach((item) => {
        if (typeof item === "object") {
          lines.push(`${spaces}  {`);
          lines.push(formatObject(item, indent + 4));
          lines.push(`${spaces}  },`);
        } else {
          lines.push(`${spaces}  ${JSON.stringify(item)},`);
        }
      });
      lines.push(`${spaces}]`);
    } else if (typeof obj[key] === "object") {
      lines.push(`${spaces}${key}: {`);
      lines.push(formatObject(obj[key], indent + 2));
      lines.push(`${spaces}}`);
    } else {
      lines.push(`${spaces}${key}: ${JSON.stringify(obj[key])}`);
    }
  }

  return lines.join("\n");
};
export default formatObject;