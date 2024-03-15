const express=require("express");
const bodyParser=require('body-parser');
const cors=require("cors");
const axios = require('axios');
const multer = require('multer');
const Posts=require("./backend/model/mongo")
const {generateRandomString}=require("./backend/controller/generator");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname.toLowerCase().split(' ').join('-');
        const filename = req.body.filename || originalname; // Use user-input filename or original filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+".png";
        console.log(filename+uniqueSuffix);
     cb(null, `${filename}-${uniqueSuffix}`);
      },
  });

const upload = multer({ storage: storage });

app.post("/process_data",async(req,res)=>{
    console.log(req.body)
    const prompt=req.body.name;
    const response=await axios.post("https://citchennai.ap-south-1.modelbit.com/v1/story/latest",{
        data:prompt
    })
    console.log(response.data.data);
    //console.log(Object.keys(response),"Hello")
    res.json({"message":response.data.data})
});

app.post("/login",(req,res)=>{
    console.log(req.body);
    res.json({"message":1})
})

app.post("/signup",(req,res)=>{
    console.log(req.body);
    res.json({"message":1})
})

app.post("/upload", upload.single("productImage"), async(req, res) => {
    const file = req.file;
  console.log('Uploaded File:', file);
  const name=file.filename;
  console.log(name);
  //dbfuns.insertFile(req.body.filename,name,req.body.productPrice);
  const {userid,title,content,hashtags}=req.body;
  const postid=generateRandomString();
  console.log(req.body);
  const newpost=new Posts({postid:postid,userid:userid,title:title,content:content,pics:name,hashtags:hashtags})
  const Post=await newpost.save()
  console.log(Post);
  // Send a response
  res.json({ message: 'File uploaded successfully!' });

});

app.post("/posts",async(req,res)=>{
    const posts=await Posts.find({},{_id:0})
    res.json({posts:posts});
});

app.post("/discussion/:discussionid",(req,res)=>{
    const params=req.params.discussionid;
    
})

app.listen(5000,()=>{
    console.log("Server running at http://localhost:5000/");
});