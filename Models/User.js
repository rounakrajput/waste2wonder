const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fName: { type: String },
    lName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose?.models?.User || mongoose?.model("User", userSchema);
