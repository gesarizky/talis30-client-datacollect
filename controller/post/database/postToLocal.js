import postRMS from "./postRMS.js";
import postInverter from "./postInverter.js";
import postMPPT from "./postMPPT.js";
const postToLocal = async (data, label, uuid_user) => {
  try {
    if (label == "RMS") {
      await postRMS({ UUID_User: uuid_user, data: data })
        .then(async () => {
          console.log(
            "🚀 ~ file: postToLocal.js: RMS ~ .then ~ response:",
            200
          );
        })
        .catch(async (error) => {
          console.log(
            "🚀 ~ file: postToLocal.js: RMS ~ postToServer ~ error:"
            //   error
          );
        });
    } else if (label == "Inverter") {
      await postInverter({ UUID_User: uuid_user, data: data })
        .then(async () => {
          console.log(
            "🚀 ~ file: postToLocal.js: Inverter ~ .then ~ response:",
            200
          );
        })
        .catch(async (error) => {
          console.log(
            "🚀 ~ file: postToLocal.js: Inverter ~ postToServer ~ error:"
            //   error
          );
        });
    } else {
      await postMPPT({ UUID_User: uuid_user, data: data })
        .then(async () => {
          console.log(
            "🚀 ~ file: postToLocal.js: MPPT ~ .then ~ response:",
            200
          );
        })
        .catch(async (error) => {
          console.log(
            "🚀 ~ file: postToLocal.js: MPPT ~ postToServer ~ error:"
            //   error
          );
        });
    }
  } catch (error) {
    console.log("error postToLocal :", error);
  }
};

export default postToLocal;
