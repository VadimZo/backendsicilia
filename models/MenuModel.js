import pkg from 'mongoose';
const { model, Schema } = pkg;


const MenuSchema = new Schema(
  {
    imageUrl: {
      type: String,
    },
    name: {
      required: true,
      type: String
    },
    description: {
        required: true,
        type: String,
      },
    types: {
        type: String
    },
    sizes: [
       {
        type: Number
       }
    ],
    weight: [
        {
         type: Number
        }
     ],
     price: [
        {
         type: Number
        }
     ],
     carousel: [
        {
         type: String
        }
     ], 
     badge: [
        {
         type: String
        }
     ],         
  },
  {
    timestamps: true,
  },
);
export const MenuModel = model('Menu', MenuSchema);
