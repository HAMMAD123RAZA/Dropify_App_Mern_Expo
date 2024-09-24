import { Product } from "../models/ProductModel.js";
import mongoose from "mongoose";

export const GetProducts=async(req,res)=>{
    try {
const data=await Product.find()        
res.json(data)
    } catch (error) {
        res.json({message:error.message})
    }
}

export const GetProduct=async(req,res)=>{
    const {id}=req.params;
    
try {
    const data=await Product.findById(id)
    if (!data) {
     return  res.json({message:'product not found'})
    }
    res.status(200).json({data})
} catch (error) {
    res.status(500).json({message:"error fetching docs",error})
}
}