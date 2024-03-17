const express=require("express");
const bodyParser=require('body-parser');
const cors=require("cors");
const axios = require('axios');
const multer = require('multer');
const {Posts,Discussion,DiscussionChat,User}=require("./backend/model/mongo")
const {generateRandomString}=require("./backend/controller/generator");
const dotenv=require("dotenv");
const session=require("express-session")
const MongoStore=require("connect-mongo");

dotenv.config();

const app=express();

const mongoStore = new MongoStore({
    mongoUrl: process.env.MONGO_URI, // Replace with connection string
    ttl: 24 * 60 * 60, // Set session expiration to 24 hours (in seconds)
    dbName: 'life_redemption', // Database name (same as connection string)
    collection: "user_session"
});
let user;

app.use(
    session({
        secret: process.env.USER_SECRET_KEY, // Replace with a strong, unique secret key
        resave: false,
        saveUninitialized: true,
        store: mongoStore,
        cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 } // Set cookie expiration to 24 hours (in milliseconds)
    })
);
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

app.post("/login",async(req,res)=>{
    console.log(req.body);
    const {username,password}=req.body;
    const data=await User.findOne({$and:[{$or:[{username:username},{email:username}]},{password:password}]});
    if(data){
        req.session.username=data.username
        user=data.username
        res.json({"message":1})
    }
    else{
        res.json({"message":0});
    }
})

app.post("/signup",async(req,res)=>{
    console.log(req.body);
    const {username,email,password}=req.body;
    const newUser=new User({username:username,email:email,password:password});
    const user=await newUser.save();
    if(user){
    res.json({"message":1})
    }
    else{
        res.json({"message":0});
    }
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

app.post("/discussion/list",async(req,res)=>{
    console.log(req.body);
    const posts=await Discussion.find({},{_id:0})
    console.log(posts);
    res.json({posts:posts});
});

app.post("/discussion/:discussionid",(req,res)=>{
    const params=req.params.discussionid;

});

app.post("/create/discussion",(req,res)=>{
    console.log(req.body);
    res.json({"Message":req.body})
});

app.post("/username",(req,res)=>{
    res.json({username:user});
})

app.listen(5000,()=>{
    console.log("Server running at http://localhost:5000/");
});