const express = require("express");
const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  resume: {
    type: String,
  },
  timestamps: true,
});

ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const ApplicationModel = mongoose.model("Application", ApplicationSchema);
module.exports = ApplicationModel;
