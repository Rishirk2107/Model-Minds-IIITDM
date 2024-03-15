const mongoose=require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})

const PostsSchema=new mongoose.Schema({
    postid:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    pics:{
        type:String,
        required:false
    },
    hashtags:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Posts=mongoose.model("Posts",PostsSchema);


const DiscussionSchema=new mongoose.Schema({
    discussionid:{
        type:String,
        required:true
    },
    discussiontopic:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


const Discussion=mongoose.model("Discussion",DiscussionSchema);


const DiscussionChatSchema=new mongoose.Schema({
    discussionid:{
        type:String,
        required:true
    },
    sentby:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const DiscussionChat=mongoose.model("Chat",DiscussionChatSchema)

module.exports=Posts