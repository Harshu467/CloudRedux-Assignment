// VirtualEvent.js

const mongoose = require("mongoose");

const VirtualEventSchema = new mongoose.Schema(
  {
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for the event organizer
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required to create a virtual event"],
    },
    description: {
      type: String,
      max: 2000,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    virtualLocation: {
      type: String,
      required: [true, "Virtual location (URL or platform link) is required"],
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model for the participants
      },
    ],
  },
  { timestamps: true }
);

const VirtualEvent = mongoose.model("VirtualEvent", VirtualEventSchema);

module.exports = VirtualEvent;
