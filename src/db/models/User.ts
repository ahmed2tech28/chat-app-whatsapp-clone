import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define the User document interface (TypeScript)
interface IUser {
  email: string;
  password: string;
  name?: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const schema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password
schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare entered password with the hashed password
schema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", schema);

export default UserModel;
