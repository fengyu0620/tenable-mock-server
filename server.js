const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json({ limit: "10mb" }));

function readJsonFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

// Tenable OT SGC GraphQL mock
app.post("/graphql", (req, res) => {
  console.log("Received GraphQL request:");
  console.log(JSON.stringify(req.body, null, 2));

  try {
    const mockResponse = readJsonFile("Tenable-Response.json");
    res.status(200).json(mockResponse);
  } catch (error) {
    console.error("Failed to read Tenable-Response.json:");
    console.error(error);

    res.status(500).json({
      error: "Failed to read Tenable-Response.json",
      message: error.message
    });
  }
});

// Honeywell-style asset API mock
app.get("/gateway/api/assets", (req, res) => {
  console.log("Received Honeywell assets request:");
  console.log(`Query params: ${JSON.stringify(req.query, null, 2)}`);

  try {
    const assets = readJsonFile("Honeywell-Responce.json");
    res.status(200).json(assets);
  } catch (error) {
    console.error("Failed to read Honeywell-Responce.json:");
    console.error(error);

    res.status(500).json({
      error: "Failed to read Honeywell-Responce.json",
      message: error.message
    });
  }
});

// Optional: check current GraphQL mock JSON
app.get("/Tenable-Response", (req, res) => {
  try {
    const mockResponse = readJsonFile("Tenable-Response.json");
    res.status(200).json(mockResponse);
  } catch (error) {
    res.status(500).json({
      error: "Failed to read Tenable-Response.json",
      message: error.message
    });
  }
});

// Optional: check current Honeywell mock JSON
app.get("/honeywell-assets", (req, res) => {
  try {
    const assets = readJsonFile("Honeywell-Responce");
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({
      error: "Failed to read Honeywell-Responce.json",
      message: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("Mock server is running.");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Mock server running on port ${port}`);
});