import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const OrdersSchema = new Schema({
 
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  order_data: {
    type: Array,
    required : true,
  }

});

// Export the User model
const Orders = mongoose.model('Orders', OrdersSchema);
export default Orders;
