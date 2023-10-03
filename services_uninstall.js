import { Service } from "node-windows";

const svc = new Service({
  name: "Talis30 Data Post",
  description: "This is program node.js for talis30.",
  script: "C:\\Talis30\\data-collect\\talis30-client-datacollect\\index.js", //path program nodejs change \ to \\
});

svc.on("uninstall", () => {
  console.log("Uninstall complete");
});

svc.uninstall();
