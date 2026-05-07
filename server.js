const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json({ limit: "10mb" }));

app.post("/graphql", (req, res) => {
  console.log("Received GraphQL request:");
  console.log(JSON.stringify(req.body, null, 2));

  try {
    const filePath = path.join(__dirname, "mock-response.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const mockResponse = JSON.parse(fileContent);

    res.status(200).json(mockResponse);
  } catch (error) {
    console.error("Failed to read mock-response.json:");
    console.error(error);

    res.status(500).json({
      error: "Failed to read mock-response.json",
      message: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("Tenable mock server is running.");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Mock server running on port ${port}`);
});