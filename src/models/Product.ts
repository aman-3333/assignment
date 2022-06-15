import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    productName: { type: String },
   
    ownerId: { type: Schema.Types.ObjectId, required: true },
    productBrand: { type: String },
    
    productDescription: { type: String },
    status: { type: String },
    variations: [
        {


            color: { type: String },
            size: { type: String },
            material: { type: String },
            SKU: { type: String },
            barcode: { type: String },
            mrp: { type: Number },
            price: { type: Number },
            bidPrice: { type: Number },
            stock: { type: Number },
            productPicture: [{ type: String }],
            weight: { type: String },
            height: { type: String },
            width: { type: String },
            depth: { type: String },
           
           
         
           
           
       
           
            variationActive: { type: Boolean, default: true },
            
            
        }

    ],

  
    discountAvailability: { type: Boolean, default: true },
    discountFix: { type: Number },
    discountPercentage: { type: Number },
   
    productActive: {
        type: Boolean, default: true
    },


 
    isDeleted: { type: Boolean, default: false },

}, {
    timestamps: true
});


export interface IProduct extends Document {
    productName: string,
    ownerId: ObjectId,
 
    productBrand: string,
  
    variations: [
        {
            color: string,
            size: string,
            material: string,
            SKU: string,
            mrp: number,
            price: number,
            bidPrice: number,
            stock: number
            productPicture: [string],
            weight: string,
            height: string,
            width: string,
            depth: string,
            barcode: string,

            tags: [string],
            variationActive: boolean,
            productBrand: string,
           
           
           
           
          
          

        }
    ],

    productDescription: string,
    
    tags: [string],


    discountAvailability: boolean,
    discountFix: number,
    discountPercentage: number,
    offers: string,
    productActive: boolean,
    isFavourite: boolean,
    isDeleted: boolean,
    status: string,
}
// user

export default model<IProduct>("Product", schema);