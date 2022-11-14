const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./account_user');
require('./food');
require('./voucher');
require('./detail_voucher');
require('./News');
require('./cart');
require('./Payment');
const Food = mongoose.model('Food');
const Account_User = mongoose.model('Account_User');
const Voucher = mongoose.model('Voucher');
const Detail_Voucher = mongoose.model('Detail_Voucher');
const News = mongoose.model('News');
const Cart = mongoose.model('Cart');
const Payment = mongoose.model('Payment');

const MongooseURI = 'mongodb+srv://ngocphuc:ngocphuc@cluster0.jm3jwgm.mongodb.net/DevFood?retryWrites=true&w=majority';
mongoose.connect(MongooseURI, {
    useNewUrlParser : true,
})
mongoose.connection.on('Connected', ___ => {
    console.log('Connect Successfully');
})
mongoose.connection.on('error', ___ => {
    console.log('Connect Error');
})
app.use(express.json());
//------------------------------------------------------------------------------------------------------------------\\
//----------------------------------------Account_User------------------------------------\\
app.post('/account_user/insert', (req,res) => {
    const Account = new Account_User({
        username : req.body.username,
        password : req.body.password,
        fullname : req.body.fullname,
        address : req.body.address,
        phone : req.body.phone,
        email : '',
        avatar : '',
        deleted : false,
    })
    Account.save()
    res.json(Account);
})
app.post('/account_user/get', async (req, res) => {
    const account_user = await Account_User.findOne({
        username : req.body.username,
        password : req.body.password,
        deleted : false,
    });
    res.json(account_user);
})
app.post('/account_user/check', async (req, res)=>{
    const check = await Account_User.findOne({
        username : req.body.username,
    });
    res.json(check);
})

app.post('/account_user/checkgoogle', async (req, res)=>{
    const email  = await Account_User.findOne({email : req.body.email})
    res.json(email);
})
app.post('/account_user/insertgoogle', async(req,res)=>{
    const insert = new Account_User({
        username : req.body.username,
        password : req.body.password,
        fullname : req.body.fullname,
        address : req.body.address,
        phone : req.body.phone,
        email : req.body.email,
        avatar : req.body.avatar,
        deleted : false,
    })
    insert.save()
    res.json(insert);
})
app.post('/account_user/update', async (req, res)=>{
    const idAccount = await Account_User.findById({_id : req.body._id});
    const updateAccount = await Account_User.findByIdAndUpdate(
        idAccount._id,
        {
            fullname : req.body.fullname,
            address : req.body.address,
            phone : req.body.phone,
            avatar : req.body.avatar,
        },
        {new : true}
    )
    res.json(updateAccount);
})
//----------------------------------------Food------------------------------------\\
app.get('/food/getfood', async (req, res)=>{
    const food = await Food.find({type : 'food'});
    res.json(food);
})
app.get('/food/getdrink', async (req, res)=>{
    const food = await Food.find({type : 'drink'});
    res.json(food);
})
app.get('/food/getsidefood', async (req, res)=>{
    const food = await Food.find({type : 'sidefood'});
    res.json(food);
})

//----------------------------------------Voucher------------------------------------\\
app.post('/voucher/insert', async (req, res)=>{
    const date = new Date();
    // var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    // Voucher.createIndexes({createAt : 1, expireAfterSeconds : 15000})
    const voucher = await new Voucher({
        name : req.body.name,
        discount : req.body.discount,
        minprice : req.body.minprice,
        special : false,
        point : 0
    })
    voucher.save()
    res.json(voucher);
})

app.get('/voucher/get', async (req, res)=>{
    const voucher = await Voucher.find({special : false})
    res.json(voucher)
})
app.get('/voucher/getspecial', async (req, res)=>{
    const voucher = await Voucher.find({special : true})
    res.json(voucher)
})
app.post('/voucher/voucher_account', async (req,res)=> {
    const voucher = await new Detail_Voucher({
        id_Voucher : req.body.id_Voucher,
        id_Account : req.body.id_Account,
        state : true,
    })
    voucher.save()
    res.json(voucher)
})
app.post('/voucher/voucher_check', async (req, res) => {
    const check = await Detail_Voucher.findOne({
        id_Voucher : req.body.id_Voucher,
        id_Account : req.body.id_Account,
    })
    res.json(check)
})

//----------------------------------------News------------------------------------\\
app.post('/News/insert', async (req, res) => {
    const news = await new News({
        title : req.body.title,
        content : req.body.content,
    })
    news.save()
    res.json(news);
})
app.get('/News/get', async(req,res)=>{
    const news = await News.find();
    res.json(news);
})

//----------------------------------------Cart------------------------------------\\
app.post('/Cart/insert', async(req, res) => {
    const cart = await new Cart({
        id_Account : req.body.id_Account,
        detail_Cart : req.body.detail_Cart,
        id_Food : req.body.id_Food,
        quantity : req.body.quantity,
        price : req.body.price,
        total : req.body.total,
        state : req.body.state,
    })
    cart.save();
    res.json(cart);
})
app.post('/Cart/insertFood', async(req, res)=>{
    const insert = await Cart.updateOne(
        {id_Account : req.body.id_Account, state : true},
        {$push : { 
            detail_Cart : 
                {
                    id_Food : req.body.id_Food,
                    quantity : 1,
                    price : req.body.price,
                }
        }},
        {new : true}
    )
    res.json(insert)
})
app.post('/Cart/checkCart', async (req,res)=>{
    const check = await Cart.findOne({id_Account : req.body.id_Account, state: true})
    res.json(check)
})
app.post('/Cart/checkFood', async (req,res)=>{
    const check = await Cart.find({id_Account : req.body.id_Account,
        state : true,
        "detail_Cart.id_Food" : req.body.id_Food
        })
    res.json(check);
})
app.post('/Cart/updateQuantityUp', async (req, res) => { //-----------
    const price = await (await Food.find({_id : req.body.id_Food})).map(item=>item.price).toString()
    const check = await Cart.findOneAndUpdate(
        {
            id_Account : req.body.id_Account,
            state : true,
            "detail_Cart.id_Food" : req.body.id_Food,
        }
        ,{$inc : {"detail_Cart.$.quantity" : 1, "detail_Cart.$.price" : Number(price)}}, {new : true}
    )
    res.json(check)
})
app.post('/Cart/updateQuantityDown', async (req, res) => { //-----------
    const price = await (await Food.find({_id : req.body.id_Food})).map(item=>item.price).toString()
    const check = await Cart.findOneAndUpdate(
        {
            id_Account : req.body.id_Account,
            state : true,
            "detail_Cart.id_Food" : req.body.id_Food,
        }
        ,{$inc : {"detail_Cart.$.quantity" : -1, "detail_Cart.$.price" : -Number(price)}}, {new : true}
    )
    res.json(check)
})
app.post('/Cart/get', async (req, res)=>{
    const getItem = await (await Cart.find({id_Account : req.body.id_Account,state : true}))
    res.json(getItem);
})
app.post('/Cart/getFood',async(req,res)=>{
    const food = await Food.findById({_id : req.body._id})
    res.json(food)
})
app.post('/Cart/updateTotal', async (req, res)=>{
    var sum = 0;
    const price = await Cart.find({id_Account : req.body.id_Account, state : true});
    const total = await price.map(item=>item.detail_Cart.map(item=>sum+=item.price))
    const updateTotal = await Cart.updateOne({id_Account : req.body.id_Account, state : true},{
        total : sum
    },{new : true})
    res.json(updateTotal);
})
app.post('/Cart/getTotal', async(req,res)=>{
    const total = await (await Cart.find({id_Account : req.body.id_Account, state : true})).map(item=>item.total);
    // const total = await Cart.find({id_Account : req.body.id_Account, state : true})
    res.json(Number(total.toString()))
    // res.json(total)
})
app.post('/Cart/getIdVoucher', async(req,res) => {
    const id_voucher = await Detail_Voucher.find({id_Account : req.body.id_Account, state : true})
    res.json(id_voucher);
})
app.post('/Cart/getVoucher', async (req,res) => {
    const voucher = await Voucher.findOne({_id : req.body._id})
    res.json(voucher);
})
app.post('/Cart/getQuantity', async(req,res)=>{
    const account = req.body.id_Account;
    const food = req.body.id_Food;
    const quantity = await Cart.find({
        id_Account : account,
        id_Food : food,
        state : true,
    })
    const quantity2 = quantity.map(item=>item.detail_Cart.filter(item=>item.id_Food==food));
    res.json(quantity2);
})
app.post('/Cart/delete', async(req,res) => {
    const id_Food = req.body.id_Food
    const id_Account = req.body.id_Account;
    // const cart = await Cart.find({
    //     id_Account : req.body.id_Account,
    //     'detail_Cart.id_Food' : id_Food,
    //     state : true})
    // const itemCart = cart.map(item=>item.detail_Cart.filter(item=>item.id_Food == id_Food))
    const deleteCart = await Cart.updateOne({id_Account, state : true},{$pull : {'detail_Cart': {'id_Food' : id_Food}}},{multi : true})
    res.json(deleteCart);
})
//----------------------------------------Payment------------------------------------\\
app.post('/Payment/insert', async(req, res)=>{
    const payment = await new Payment({
        id_Cart : req.body.id_Cart,
        id_DetailVoucher : req.body.id_DetailVoucher,
        payment_Method : req.body.payment_Method,
        receive_Method : req.body.receive_Method,
        confirm_Order : req.body.confirm_Order,
        order_Status : req.body.order_Status,
        state : true,
        total : req.body.total,
    })
    payment.save();
    res.json(payment);
})
app.post('/Payment/get', async(req,res)=>{
    const getCart = await (await Cart.find({id_Account : req.body.id_Account, state : false})).map(item=>item._id);
    const getOrder = await Payment.find({id_Cart : getCart}).sort({createdAt : -1});
    res.json(getOrder);
})
app.post('/Payment/changeStateCart', async(req, res) => {
    const id = await Cart.findById({_id : req.body._id})
    const changeStateCart = await Cart.findByIdAndUpdate(id, {state : false}, {new : true})
    res.json(changeStateCart);
})
app.post('/Payment/changeStateVoucher', async(req, res)=>{
    const id = await Detail_Voucher.findById({_id : req.body._id});
    const changeStateVoucher = await Detail_Voucher.findByIdAndUpdate(id, {state : false}, {new : true});
    res.json(changeStateVoucher);
})
app.post('/Payment/getImage', async (req,res) => {
    const getImage = await (await Cart.find({_id : req.body._id})).map(item => item.detail_Cart);
    const food = getImage.map(item=>item);
    const image = await Food.find({_id : food[0][0].id_Food});
    res.json(image);
})
app.post('/Payment/getOrder', async (req, res) => {
    const Order = await Payment.find({id_Cart : req.body.id_Cart});
    res.json(Order)
})
app.post('/Payment/updateState', async (req,res)=>{
    const updateState = await Payment.findOneAndUpdate({_id : req.body._id},{state : false},{new:true})
    res.json(updateState)
})
//----------------------------------------Order_Detail------------------------------------\\
app.post('/OrderDetail/getCart', async(req,res)=>{
    const getCart = await Cart.find({_id : req.body._id});
    const getDetail = getCart.map(item=>item.detail_Cart);
    res.json(getDetail[0]);
})
app.post('/OrderDetail/getFood', async (req, res)=>{
    const getFood = await Food.find({_id : req.body._id});
    res.json(getFood[0]);
})
app.post('/OrderDetail/getTotalCart', async(req,res)=>{
    const getTotalCart = await Cart.find({_id : req.body._id});
    res.json(getTotalCart[0].total);
})
app.post('/OrderDetail/getTotalQuantity', async(req,res)=>{
    let sum = 0;
    const cart = await Cart.find({_id : req.body._id});
    const detail = cart.map(item=>item.detail_Cart.map(item=>sum+=item.quantity));
    res.json(sum);
})
//----------------------------------------History------------------------------------\\
app.post('/History/getCart', async (req,res)=>{
    const getCart = await Cart.find({_id : req.body._id});
    const detail = getCart.map(item=>item.detail_Cart);
    res.json(detail[0]);
})
app.post('/History/getIdCart',async (req,res)=>{
    const getId = await Cart.find({id_Account : req.body.id_Account, state : true})
    res.json(getId[0])
})
app.post('/History/deleteCurentCart', async (req,res)=>{
    const idCart = await Cart.findById({_id : req.body._id})
    const deleteCart = await Cart.findByIdAndUpdate(idCart,{$pull : {'detail_Cart':{}}},{multi : true})
    res.json(deleteCart)
})
app.post('/History/insertCart', async(req,res)=>{
    const insert = await Cart.updateOne(
        {_id : req.body._id},
        {$push : { 
            detail_Cart : 
                {
                    id_Food : req.body.id_Food,
                    quantity : req.body.quantity,
                    price : req.body.price,
                }
        }},
        {new : true}
    )
    res.json(insert)
})
app.get('/', (req,res) => {
    res.send('WELCOME TO NODEJS');
})
app.listen(3000, ___ =>{
    console.log('listening on port 3000');
})