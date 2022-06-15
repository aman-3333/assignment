
import User,{ IUser } from "../models/User";

import Product, { IProduct } from "../models/Product";

import FuzzySearch from 'fuzzy-search';
export default class ProductController {



    public async createProduct(body: IProduct) {
        console.log("body", body);

        let productInfo: IProduct = await Product.create(body);
        console.log("productInfo", productInfo);



       
        // await productPicReplica.create(productId: productInfo._id, ProductPicture: body.variations.productPicture,);





        return productInfo;
    }








    public async editProduct(body: any) {
        let productInfo: any;
        // productInfo = await Product.updateMany({ "variations._id": variationsId }, { $set: { "variations.$.stock": body.stock } })

            productInfo = await Product.updateMany(
                { "variations._id": body.variationsId },
            {
                "$set": {

                    "variations.$.productPicture": body.productPicture,
                    "variations.$.barcode": body.barcode,
                    "variations.$.tags": body.tags,
                    "variations.$.variationName": body.variationName,
                    "variations.$.discountFix": body.discountFix,
                    "variations.$.discountPercentage": body.discountPercentage,
                    "variations.$.variationActive": body.variationActive,

                    "variations.$.color": body.color,
                    "variations.$.material": body.material,
                    "variations.$.SKU": body.SKU,
                    "variations.$.price": body.price,
                    "variations.$.stock": body.stock,
                    "variations.$.weight": body.weight,
                   

                    "variations.$.productBrand": body.productBrand,
                    "variations.$.productDescription": body.productDescription,

                }
            }
        )
        
        


        return productInfo;
        
       
    }


    
  

    public async productActivate(body: IProduct, productId:string,veriationId:string) {
        let productInfo: any ;
        let userInfo: any;
        userInfo = await User.findOne({ _id: body.ownerId,isDeleted:false
})
        if (body.status == 'productActive' && userInfo.usertype=='Admin') {
            productInfo = await Product.findOneAndUpdate({ _id: productId, isDeleted: false }, { $set: { productActive: true } }).lean()

        } else if (body.status == 'productDisactive' && userInfo.usertype == 'Admin') {
            productInfo = await Product.findOneAndUpdate({ _id:productId, isDeleted: false }, { $set: { productActive: false } }).lean()
        } 
        if (body.status == 'veriationActive' && userInfo.usertype == 'Admin') {
            productInfo = await Product.findOneAndUpdate({ "variations._id": veriationId, isDeleted: false }, {
                $set: { "variations.variationActive": true } }).lean()
        } else if (body.status == 'veriationDisactive' && userInfo.usertype == 'Admin') {
            productInfo = await Product.findOneAndUpdate({ "variations._id": veriationId, isDeleted: false }, {
                $set: { "variations.variationActive": false }
            }).lean()
        }
        return productInfo
    }

   

    public async deleteProduct(productId: any) {
        const productInfo = await Product.findOneAndUpdate({ _id: productId, isDeleted: false }, {
            $set: {
                isDeleted: true
            }
        }, { new: true });
        return productInfo;
    }

    public async getProduct(){
       let newArr:any = [];
        let productInfo = await Product.find({ productActive:true,isDeleted:false})
        console.log("productInfo", productInfo)
        productInfo = productInfo.map((e: any) => e.variations)
        console.log("productInfo2", productInfo)

        for (var i = 0; i < productInfo.length; i++) {
            newArr = newArr.concat(productInfo[i]);
        }
        newArr = newArr.filter((e: any) => e.variationActive==true)
        return newArr
    } 


    public async adminOperation(userId: string, adminId: string, status:string, body:IUser,){

        let accountInfo:any = await User.findOne({ _id: adminId,isDeleted:false})
        let userInfo: any;
        if (accountInfo.usertype=="Admin" &&status=="delete user"){
            userInfo = await User.findOneAndUpdate({ _id: userId, isDeleted: false }, { $set: { isDeleted: true}},{new:true})

        }
        else if (accountInfo.usertype == "Admin" && status == "update user"){
            userInfo = await User.updateMany({ _id: userId, isDeleted: false }, body)
        }
        return userInfo

    }

    

}