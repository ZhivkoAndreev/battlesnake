export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const snakeInfo = {
    apiversion: "1",
    author: "Jay69", //Username for play.battlesnake
    color: "#575454",
    head: "crystal-power",
    tail: "crystal-power",
  };

  res.json(snakeInfo);
}
