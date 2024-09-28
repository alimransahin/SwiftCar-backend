import { Types } from "mongoose";

export type TBook = {
  userId: Types.ObjectId;
  carId: Types.ObjectId;
  pickUpDate: Date;
  pickUpTime: string;
  dropOffDate: Date;
  dropOffTime: string;
  totalCost: number;
  status: "Done" | "Pending" | "Approved";
  isReturn: boolean;
  isPaid: boolean;
};
