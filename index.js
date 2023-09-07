import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import mainControl from "./controller/mainControl.js";
var taskRMS;
var taskInverter;
var taskMPPT;

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
[taskRMS, taskInverter, taskMPPT] = await mainControl();
taskRMS.start();
taskInverter.start();
taskMPPT.start();

routes(app);

// CONTROLL

app.post("/start", async (req, res) => {
  try {
    taskRMS.start();
    taskInverter.start();
    taskMPPT.start();
    res.json({ status: 200, message: "post started" });
  } catch (error) {
    throw ("error index : post/start :", error);
  }
});

app.post("/stop", async (req, res) => {
  try {
    taskRMS.stop();
    taskInverter.stop();
    taskMPPT.stop();
    res.json({ status: 200, message: "post stoped" });
  } catch (error) {
    throw ("error index : post/stop :", error);
  }
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
