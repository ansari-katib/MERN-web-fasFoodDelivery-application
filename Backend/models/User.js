import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the User model
const User = mongoose.model('User', UserSchema);
export default User;
