import mongoose, { Document, Schema } from "mongoose";

export enum ResourceType {
  HUMAN = "HUMAN",
  EQUIPMENT = "EQUIPMENT",
}

export interface IResource extends Document {
  name: string;
  description: string;
  type: ResourceType;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      require: true,
      // enum: Object.values(ResourceType),
      enum:["HUMAN",'EQUIPMENT'],
      default: ResourceType.HUMAN,
      index: true,
    },
  },
  { timestamps: true }
);

ResourceSchema.index({ name: "text" });

ResourceSchema.path('type').validate(function(value: string) {
  return Object.values(ResourceType).includes(value as ResourceType);
}, 'Invalid type');


export default mongoose.model<IResource>("Resource", ResourceSchema);
