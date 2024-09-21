import mongoose from "mongoose";

export default function connectDb() {
  return (
    process.env.MONGO &&
    mongoose
      .connect(process.env.MONGO)
      .then(() => console.log("Db Connected...."))
      .catch((err) => console.log(err.message, "Error conneting Db...."))
  );
}
