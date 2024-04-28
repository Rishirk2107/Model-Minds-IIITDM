import { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method=="POST"){
        try{
            console.log(req.body)
            const prompt=req.body.data;
            const response=await axios.post("https://citchennai.ap-south-1.modelbit.com/v1/story/latest",{
                data:prompt
            })
            console.log(response.data.data);
            //console.log(Object.keys(response),"Hello")
            res.json({"message":response.data.data})
            //res.json({'message':"Received"})
        }
        catch(err){
            console.log("Error at fetching generated response",err);
        }
    }
    
}