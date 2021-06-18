import pkg from 'mongoose';
const { model, Schema } = pkg;


const UserSchema = new Schema(
  {
    phone: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
        required: true,
        type: String,
      },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const UserModel = model('User', UserSchema);
