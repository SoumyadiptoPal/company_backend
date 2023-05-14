const express = require('express');
const dotenv =require("dotenv");
// const Users=require('./models/Users.mts');
const {ServerApiVersion}=require('mongodb')
var cors = require('cors');
const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
const router =express();
// const connectDB=async()=>{
//     try{
//         await mongoose.connect(`mongodb://${server}/${database}`);
//         console.log("MongoDB connected");
//     }catch(err){
//         console.log("Failed to connect",err);
//     }
// }
// *****

dotenv.config({path: './config.env'});
const uri = process.env.DATABASE;

mongoose.connect(uri,{
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log(err));

const app = express()
const port =process.env.PORT || 5000;

const Mongoose=require('mongoose');
const { Schema } = Mongoose

const UserSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Status:{
        type:String,
        required: true
    },
    Role:{
        type: String,
        required: true
    },
    ImageUrl:{
        type:String,
        required: true
    },
    LastLogin:{
        type: Date,
        // required: true
    }
  });
  const User = Mongoose.model('user', UserSchema);

//Add a new User using POST "/api/Users/addUser".
router.post('/addUser', async(req, res)=> {
    try {
        const { Name, Email, Status, Role, ImageUrl } = req.body;
        let LastLogin=new Date();
        const user = new User({
            Name, Email, Status, Role, ImageUrl, LastLogin
        })
        const savedUser = await user.save()
        res.json(savedUser)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/', async(req,res)=>{
    res.send("App is Working");
});
// get all  users
router.get('/getUser',async (req,res)=>{
    try{
        const user=await User.find();
        res.json(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Delete a user
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        // Find the user to be deleted and delete it

        let user = await User.deleteOne({"Email": req.params.id});
        res.json({user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/editUser/:id', async (req, res) => {
    try {
        const{Name,Role}=req.body;
        let user = await User.updateOne({"Email":req.params.id},{$set:{'Name':Name,'Role':Role}});
        res.json({user});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

app.use(cors())
app.use(express.json())
app.use('/api/Users', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
