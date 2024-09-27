import express from "express";
import { userValidation } from "./user.validation";
import validateRequest from "../middleware/validateRequest";
import { UserController } from "./user.controller";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserValidationSchema),
  UserController.createUser
);
// router.post(
//   "/signin",
//   validateRequest(userValidation.signInUserValidationSchema)
// );
router.get("/all-user", UserController.getAllUser);
router.put(
  "/update-profile/:id",
  validateRequest(userValidation.updateUserValidationSchema),
  UserController.updateUser
);
router.get("/:email", UserController.getUserProfile);
export const UserRoutes = router;
