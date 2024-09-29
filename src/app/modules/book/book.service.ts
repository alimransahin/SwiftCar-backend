import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBook } from "./book.interface";
import { Book } from "./book.model";
import { User } from "../user/user.model";
import { initialPayment } from "../payment/payment.utils";

const createBookIntoDb = async (payload: TBook) => {
  const newBook = await (
    await (await Book.create(payload)).populate("userId")
  ).populate<{ carId: any }>("carId");

  if (!newBook.carId || typeof newBook.carId !== "object") {
    throw new AppError(httpStatus.NOT_FOUND, "Car details not found");
  }
  newBook.carId.status = "unavailable";

  await newBook.carId.save();
  const transactionId = `txn-${Date.now()}`;
  const paymentData = {
    transactionId,
    amount: 20,
    customerName: "Imran",
    customerEmail: "email@gmail.com",
    customerPhone: "2506",
    customerAddress: "House B-158 Road 22",
  };
  const paymentSession = await initialPayment(paymentData);
  return paymentSession;
};
const getAllBookFromDB = async () => {
  const result = await Book.find().populate("userId").populate("carId");
  return result;
};
const getAllBookFromDBByUser = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  // const allResult = await Book.find().populate("userId").populate("carId");
  const result = await Book.find({ userId: user._id })
    .populate("carId")
    .populate("userId");
  return result;
};
const getSingleBookFromDB = async (userId: any) => {
  const result = await Book.find({ userId: userId.userId._id })
    .populate("userId")
    .populate("carId");
  return result;
};
export const bookService = {
  createBookIntoDb,
  getAllBookFromDB,
  getAllBookFromDBByUser,
  getSingleBookFromDB,
};
