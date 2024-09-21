import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Book } from "../book/book.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
  const newCar = await Car.create(payload);
  return newCar;
};
const getAllCarFromDB = async () => {
  const result = await Car.find();
  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findOne({ _id: id });
  return result;
};
const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteCarFromDB = async (id: string) => {
  const deleteInfo = {
    isDeleted: true,
  };
  const result = await Car.findOneAndUpdate({ id }, deleteInfo, { new: true });
  return result;
};

const returnCarUpdateIntoDB = async (payload: any) => {
  const bookingId = payload.bookingId;

  const allBook = await Book.findById(bookingId)
    .populate<{ carId: any }>("carId")
    .populate("userId");

  if (!allBook) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  if (!allBook.carId || typeof allBook.carId !== "object") {
    throw new AppError(httpStatus.NOT_FOUND, "Car details not found");
  }

  const startTime = allBook.startTime;
  const endTime = payload.endTime;

  if (!startTime || !endTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Start time or end time is missing"
    );
  }

  const convertToHours = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const startHour = convertToHours(startTime);
  const endHour = convertToHours(endTime);
  const duration = endHour - startHour;
  const pricePerHour = allBook.carId.pricePerHour;
  const totalCost = duration * pricePerHour;

  allBook.endTime = endTime;
  allBook.totalCost = totalCost;
  allBook.carId.status = "available";
  const updatedBook = await allBook.save();

  return updatedBook;
};

export const carService = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  returnCarUpdateIntoDB,
};
