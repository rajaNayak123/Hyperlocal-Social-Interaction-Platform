import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200 // 2 hours TTL
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Geospatial 2dsphere index
roomSchema.index({ location: '2dsphere' });

const Room = mongoose.model('Room', roomSchema);
export{Room}
