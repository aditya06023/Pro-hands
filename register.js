var mongos=require("./db/config.js")
var mongos=require("mongoose")
var bcrypt=require("bcrypt");
const Schema1 = new mongos.Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type: String,
        required:true
    },
    email_id:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    repeat_password:{
        type: String,
        required:true
    },
     address:{
        type: String
    
    },
    tel:{
        type: Number,
        required:true
    },
   
    
    box:{
        type: String
        
    },
    date:{
        type: Date,
        default:Date.now
    },
    
})

Schema1.pre("save", function(next){
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})
Schema1.methods.comparePassword = function(plaintext, callback){
    return callback(null, bcrypt.compareSync(plaintext, this.password))
}

const registerSchema= new mongos.model("register",Schema1 )
module.exports = registerSchema;