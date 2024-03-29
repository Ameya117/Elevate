const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String },
      qty: { type: Number, default: 1 },
    },
  ],
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  stauts: { type: String,default:'Pending', required: true },
},{timestamps :true});

mongoose.models={}
export default mongoose.model("Order",OrderSchema);