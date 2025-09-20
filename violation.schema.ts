import mongoose, { Document, Types } from 'mongoose';

export interface ViolationDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  photoUrl?: string;
  date: Date;
  latitude: number;
  longitude: number;
  userId: Types.ObjectId;
}

const ViolationSchema = new mongoose.Schema<ViolationDocument>({
  title: { type: String, required: true },
  description: { type: String },
  photoUrl: { type: String },
  date: { type: Date, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

ViolationSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const ViolationModel = mongoose.model<ViolationDocument>('Violation', ViolationSchema);
