
var mongos=require("./db/config");
 var regis=require("./register");
const bodyParser=require('body-parser');
var mongoose = require('mongoose');


var express=require('express');
var app=express();
// var cookie = require('cookie-parser');
// var session = require('express-session');
var router=express.Router();
var addproduct=require('./product')
var multer = require('multer')


 const path =require('path')
 app.use(express.static(path.join(__dirname, '/upload')));

app.set('view engine', 'ejs')
app.use(express.static('views'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookie());
// app.use(
//   session({
//     key: "user_adi",
//     secret: "random",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires:60000,
//     },
//   })
// );


app.get('/', function (req, res) {  
    res.render('index');  
   
  app.get('/services', function (req, res) {  
    res.render('services');  
  }); 
  app.get('/appliance', function (req, res) {  
    res.render('appliance');  
  }); 
app.get("/register",function(req,res){
  res.render('register')
})

router.post('/register',(req, res)=> {
  var register1= {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id: req.body.email_id,
    password: req.body.password,
    repeat_password: req.body.repeat_password,
     address:req.body.address,
    tel:req.body.tel,
   
    box: req.body.box
    
  };
  var regpost = new regis(register1);
  regpost.save()
  .then(() => res.json('register succesfully'))
  .catch(err => res.status(400).json('error:'+err));
});


//====================================


router.get('/view_regis', async (req, res) => {
  try {
    const viewregis = await regis.find({});
    res.render('dashboard/view_regis', { viewregis: viewregis });
    console.log(viewregis);
  }
  catch (err) {
    console.log(err);
  }
});
// delete
router.get("/delete/:id", async (req, res) => {
  try {
    const movies = await regis.findByIdAndRemove(req.params.id);
    res.redirect("/view_regis")
  }
  catch (err) {
    console.log(err)
  }
})

router.get("/edit/:id", async (req, res) => {
  try {
    const movies1 = await regis.findById(req.params.id);
    res.render("dashboard/edit_regis", { movies1: movies1 })

  }
  catch (err) {
    console.log(err)
  }
})



router.post("/edit/:id", async (req, res) => {
  const itemId = req.params.id;
  const updatedData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id: req.body.email_id,
    password: req.body.password,
    repeat_password: req.body.repeat_password,
    tel:req.body.tel,
    address:req.body.address,
    box: req.body.box
  };
  try {
    const updatedItem = await regis.findByIdAndUpdate(itemId, updatedData, { new: true, });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // res.json(updatedItem);
    res.render('/edit/' + itemId)
    res.redirect('./view_regis')


  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// dashboard log
// app.get("/dashboard",function(req,res){
//   if (req.session.user && req.cookies.user_adi) {
//     res.render('dashboard/index')
//   }

//   else{
//     res.redirect("/adminlogin")
//   }
// });
app.get("/dashboard",function(req,res){
  res.render('dashboard/index')
})


router.get("/delete1/:id", async (req, res) => {
  try {
    const movies2 = await addproduct.findByIdAndRemove(req.params.id);
    res.redirect("/view_product")

  }
  catch (err) {
    console.log(err)
  }
})


//edit product
router.get("/edit1/:id", async (req, res) => {
  try {
    const productdata1 = await edit_product.findById(req.params.id);
    //  console.log(productdata1)
    res.render("dashboard/edit_product", { productdata1: productdata1 });
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit1/:id", async (req, res) => {
  const itemId1 = req.params.id;
  const updatedData1 = {
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    product_image: req.body.product_image
  };
  try {
    const updatedItem1 = await product.findByIdAndUpdate(itemId1, updatedData1, { new: true });

    if (!updatedItem1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // res.json(updatedItem);
    res.render('/edit1/' + itemId1)
    res.redirect('/view_product')


  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// login post api
router.post('/login',async (req,res)=>{
    var email_id= req.body.email_id,
        password=req.body.password;

    try{
        var user= await regis.findOne({email_id:email_id })
        .exec();
        console.log(user)
        if(!user){
            res.redirect("/");
        }
        user.comparePassword(password,(error,match)=>{
            if(!match){
                res.redirect("/")
            }
        })
        req.session.user = user;
        res.redirect("/dashboard")
    }  
    catch(err){
        console.log(err)
    }  
})


// adminlogin api

// app.get("/adminlogin",function(req,res){
  
//   res.render('dashboard/adminlogin')
// })

app.get("/add_product",function(req,res){
  
  res.render('dashboard/add_product')
})
// file upload
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null ,'./upload');
    
  },

  filename: function (req, file, cb){
    cb(null,file.originalname);
    

  }
});

const fileFilter = (req,file,cb)=>{
  const allowedFileTypes =['image/jpeg','image/jpg','image/png','image/webp'];
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}
 let upload = multer({storage,fileFilter});

//  

router.post('/add_product',upload.single('product_image'), (req, res) => {
  var addproduct1 = {
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    product_image:req.file.filename,
    
  };
  var regpost = new addproduct(addproduct1);
  regpost.save()
    .then(() => res.json('register successfully'))
    .catch(err => res.status(400).json('error:' + err));
});

router.get("/view_product", async function(req,res){
   try{
        const product1=await addproduct.find({});
        res.render("dashboard/view_product",{product1:product1});
        console.log(product1);
    } catch(err){
    console.log(err);}
})

})



  app.use('/',router)
app.listen(8080)