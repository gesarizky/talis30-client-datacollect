import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import mainControl from "./controller/mainControl.js";
import sendLocalToServer from "./controller/post/axios/sendLocalToServer.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
const [
  taskRMS,
  taskInverter,
  taskMPPT,
  taskRealtime,
  taskRealtimeRms,
  taskRealtimeInverter,
] = await mainControl();
taskRMS.start();
taskInverter.start();
taskMPPT.start();
taskRealtime.start();
taskRealtimeRms.start();
taskRealtimeInverter.start();

routes(app);

// CONTROLL

app.post("/start", async (req, res) => {
  try {
    taskRMS.start();
    taskInverter.start();
    taskMPPT.start();
    taskRealtime.start();
    taskRealtimeRms.start();
    taskRealtimeInverter.start();
    res.json({ status: 200, message: "started" });
  } catch (error) {
    throw ("error index : post/start :", error);
  }
});

app.post("/stop", async (req, res) => {
  try {
    taskRMS.stop();
    taskInverter.stop();
    taskMPPT.stop();
    taskRealtime.stop();
    taskRealtimeRms.stop();
    taskRealtimeInverter.stop();
    res.json({ status: 200, message: "stoped" });
  } catch (error) {
    throw ("error index : post/stop :", error);
  }
});

app.post("/sendlocal", async (req, res) => {
  try {
    await sendLocalToServer();
    res.json({ status: 200, message: "local posted" });
  } catch (error) {
    throw ("error index : post/stop :", error);
  }
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
