const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://ronnyobura:Ronny%4038602831@provider1.0403u2d.mongodb.net/LoginFormPractice")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
    email:{
        type:String,
        required:true
    },
    phone: {
      type: String,
      required: true,
      unique: true, // Ensure uniqueness of phone number
    },
    password:{
        type:String,
        required:true
    },
    networkDevicesname: {
        type: String,
        default: "Default Network Device"
    },
    paymentStatus: {
        type: String,
        default: "Pending"
    },
    connectedDevices: {
        type: String,
        default: 0
    },
    connectionStatus: {
        type: String,
        default: "Disconnected"
    },
    networkSpeed: {
        type: String,
        default: "20Mbps"
    },
    signalStrength: {
        type: String,
        default: "Strong"
    },
    Amount: {
        type: String,
        default: "0"  // Default value with prefix "Ksh"
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    subscriptionStartDate: {
        type: Date,
        default: Date.now
    },
    RemainingDays: {
        type: Number,
        default: 30
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection
