import { Service } from "node-windows";

const svc = new Service({
  name: "Talis30 Data Post",
  description: "This is program node.js for talis30.",
  script:
    "C:\\Users\\H P\\Desktop\\talis30\\talis30client\\talis30-client-datacollect\\index.js", //path program nodejs change \ to \\
});

svc.on("install", () => {
  svc.start();
});

svc.install();
