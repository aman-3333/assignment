import express, { response } from "express";

import { IUser } from "../models/User";

import { IProduct } from "../models/Product";
 import ProductController from "../controllers/ProductController";
import AuthController from "../controllers/AuthController";
import { successResponse, errorResponse } from "../services/apiResponse"
import { ObjectId } from "mongoose";

const router = express.Router();








///////////////////////////////////////////////////authManagement//
router.post("/signUp", async (req, res) => {

    try {
        const body = req.body as IUser;
        console.log("body", body);

        const controller = new AuthController();
        const response= await controller.signUp(body);
        console.log("response", response);

        res.status(200).json(successResponse("signUp ", response, res.statusCode));
    } catch (error) {
        console.error("error in signUp", error);
        res.status(500).json(errorResponse("error in signUp", res.statusCode));
    }
}); 
router.post("/SignIn", async (req, res) => {

    try {
        const body = req.body as IUser;
        console.log("body", body);

        const controller = new AuthController();
        const response= await controller.signIn(body);
        console.log("response", response);

        res.status(200).json(successResponse("product ", response, res.statusCode));
    } catch (error) {
        console.error("error in product", error);
        res.status(500).json(errorResponse("error in product", res.statusCode));
    }
});
 router.patch("/resetPasword", async (req, res) => {

    try {
        const body = req.body as IUser;
        console.log("body", body);

        const controller = new AuthController();
        const response= await controller.resetPassword(body);
        console.log("response", response);

        res.status(200).json(successResponse("resetPasword ", response, res.statusCode));
    } catch (error) {
        console.error("error in resetPasword", error);
        res.status(500).json(errorResponse("error in resetPasword", res.statusCode));
    }
});




////////////////////////////////////////////////////////////////////////
router.post("/", async (req, res) => {

    try {
        const body = req.body as IProduct;
        console.log("body", body);

        const controller = new ProductController();
        const response: IProduct = await controller.createProduct(body);
        console.log("response", response);

        res.status(200).json(successResponse("product ", response, res.statusCode));
    } catch (error) {
        console.error("error in product", error);
        res.status(500).json(errorResponse("error in product", res.statusCode));
    }
});


router.get("/productList",async (req,res)=>{
    try{
        const controller=new ProductController();
        const response =await controller.getProduct();
        res.status(200).json(successResponse("productList",response,res.statusCode))
    }
    catch(error){
        console.error("error in productList",error);
        res.status(500).json(errorResponse("error in productList",res.statusCode))
    }
})

router.patch("/adminOperation",async(req,res)=>{
    try {
        const body = req.body; 
        const userId = req.body.userId; 
        const adminId = req.body.adminId;
         const status = req.body.status;
        const controller =new ProductController();
        const response = await controller.adminOperation(userId, adminId, status, body)
        res.status(200).json(successResponse("productList", response, res.statusCode))
    
    }
    catch(error){
        console.log("error in adminOperation ",error);
        res.status(500).json(errorResponse("error in adminOperation",res.statusCode))
        
        
    }
})


router.patch("/:id", async (req, res) => {
    try {
        
        const body = req.body;
        const controller = new ProductController();
        const response = await controller.editProduct(body);
        res.status(200).json(successResponse("update product", response, res.statusCode));
    } catch (error) {
        console.error("error in update product", error);
        res.status(500).json(errorResponse("error in update product", res.statusCode));
    }
});
router.post("/productActivate", async (req, res) => {
    try {
        const body = req.body;
        const productId: string = req.body.productId;
        const veriationId: string = req.body.veriationId;
        const controller = new ProductController();
        const response = await controller.productActivate(body, productId, veriationId);
        res.status(200).json(successResponse("productActivate", response, res.statusCode));
    } catch (error) {
        console.error("error in productActivate", error);
        res.status(500).json(errorResponse("error in productActivate", res.statusCode));
    }
});


// router.post("/AddProduct", async (req, res) => {
//     try {

//         const userId = req.body.userId;
//         const productId = req.body.productId;
//         const status = req.body.status;
//         const size = req.body.size;
//         const quantity = req.body.quantity;
//         const body = req.body;
//         const controller = new CustomerController();
//         const response: IShop = await controller.cartProduct(userId, productId, status, size, quantity, body);
//         res.status(200).json(successResponse("AddProduct", response, res.statusCode));
//     } catch (error) {
//         console.error("error in AddProduct", error);
//         res.status(500).json(errorResponse("error in AddProduct", res.statusCode));
//     }
// });



// router.get("/productInfoById", async (req, res) => {
//     try {
//         const productId = req.query.productId;
//         const variationsId = req.query.variationsId;
//         const controller = new ProductController();
//         // const response = await controller.getProductInfoById(productId, variationsId);
//         const response = await controller.getProductInfoById(productId, variationsId);
//         res.status(200).json(successResponse("productInfoById", response, res.statusCode));
//     } catch (error) {
//         console.error("error in productInfoById", error);
//         res.status(500).json(errorResponse("error in productInfoById", res.statusCode));
//     }
// });



// router.patch("/delete/:id", async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const body = req.body as IProduct;
//         const controller = new ProductController();
//         const response: IProduct | null = await controller.deleteProduct(productId);
//         res.status(200).json(successResponse("delete product", response, res.statusCode));
//     } catch (error) {
//         console.error("error in delete product", error);
//         res.status(500).json(errorResponse("error in delete product", res.statusCode));
//     }
// });


export default router;
