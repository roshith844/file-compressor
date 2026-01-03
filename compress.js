#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { pipeline } = require("stream");

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node compress.js <file>");
  process.exit(1);
}

const source = path.resolve(inputPath);
const destination = source + ".gz";

pipeline(
  fs.createReadStream(source),
  zlib.createGzip(),
  fs.createWriteStream(destination),
  (err) => {
    if (err) {
      console.error("❌ Compression failed:", err.message);
      process.exit(1);
    }
    console.log("✅ Compression completed:", destination);
  }
);
