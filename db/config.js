var mongoose=require('mongoose');
//var conn=mongoose.connect("mongodb+srv://minkashyap:admin123@cluster0.amrmav9.mongodb.net/testing?retryWrites=true&w=majority",
var conn=mongoose.connect("mongodb+srv://zesh1436:zeshmace@cluster0.25fyyfq.mongodb.net/?retryWrites=true&w=majority",
{

 useNewUrlParser:true,
 useUnifiedTopology:true

}
)
.then(()=> console.log("connection successfully.."))
.catch((err)=> console.log(err));

module.exports=conn;