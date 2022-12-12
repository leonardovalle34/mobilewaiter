import { Router } from 'express';
import  multer  from "multer";
import path from 'node:path';
import { listCategories } from './app/usecases/categories/listcategory';
import { createCategories } from './app/usecases/categories/createcategory';
import { listProducts } from './app/usecases/products/listproducts';
import { createProducts } from './app/usecases/products/createproduct';
import {listProductsByCategory} from './app/usecases/categories/listproductsbycategory';
import { listOrders } from './app/usecases/orders/listorders';
import { createOrder } from './app/usecases/orders/createorder';
import { changeOrderStatus } from './app/usecases/orders/chageorderstatus';
import { deleteOrders } from './app/usecases/orders/deleteorder';
import { deleteCategory } from './app/usecases/categories/deletecategory';

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,callback){
            callback(null,path.resolve(__dirname,'..','uploads'));
        },
        filename(req, file, callback){
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    }),
});

//list categories

router.get("/categories", listCategories);

//create category

router.post("/categories",createCategories);

//list products

router.get("/products",listProducts);

//create products

router.post("/products",upload.single("image"), createProducts);

//get product by category

router.get("/categories/:categoryId/products", listProductsByCategory)

//list orders

router.get("/orders", listOrders)

//create order

router.post("/orders", createOrder)

//change order status

router.patch("/orders/:orderId", changeOrderStatus);

//delete

router.delete("/orders/:orderId", deleteOrders);

//delete de categorias

router.delete("/categories/:categoryId", deleteCategory);



