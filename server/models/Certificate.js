const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
