var mongos=require("./db/config")
var mongos=require("mongoose")

const Schema2= new mongos.Schema({

    product_name:{type:String},

    product_description:{type:String},
    
    product_price:{type:String},

    product_image:{type:Buffer},


    // active:Boolean,
    date:{type:Date,default:Date.now}
    
    });
    
    //collection creation 
    // var declared with const must bne in caps beacuse it'll be used as a class
    
    // const Laylist = new mongo.model("Disctrack",listSchema);
    // // playlist is a name of collection name
    
    
    // // create document or insert
    // const createDocument=async()=>{
    
    //     try{
    //         const productlist2= new Laylist({
    //             name:'sita',
    //             email:'sita@gmail.com'
    //         })
    
    //         // method to save one data
    //         // productlist2.save()
           
    //         const productlist3= new Laylist({
    //             name:'gita',
    //             email:'gita@gmail.com'
    //         })
    
    //         const productlist4= new Laylist({
    //             name:'dita',
    //             email:'dita@gmail.com'
    //         })
    
    //         const productlist5= new Laylist({
    //             name:'eita',
    //             email:'eita@gmail.com'
    //         })
    
    //         const result= await Laylist.insertMany([productlist2,productlist3,productlist4,productlist5]);
    //         console.log(result);
    
    
    //     }
    //     catch(err){console.log(err)}
    
    // }
    // createDocument()

    const productSchema= new mongos.model('addproduct',Schema2);
    module.exports=productSchema;