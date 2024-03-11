const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //   userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("User", UserSchema);

// mongoose.models={}
// export default mongoose.model("User", UserSchema);
