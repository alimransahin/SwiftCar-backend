import { Types } from "mongoose";

export type TBook = {
  userId: Types.ObjectId;
  carId: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: null | string;
  totalCost: number;
};
