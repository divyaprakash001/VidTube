/*
  id string pk
  name string
  description string
  createdAt Date
  updatedAt Date
  videos ObjectId[] videos
  owner ObjectId users
*/

import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      type: String, //cloudinary url
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
)

export const Playlist = mongoose.model("Playlist", playlistSchema)