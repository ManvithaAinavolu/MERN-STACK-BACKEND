const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');
const ExpenseSchema=new mongoose.Schema({
    email:{type:String,required:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},
    category:{type:String,required:true},
    date:{type:Date,required:true},
    description:{type:String,required:true}
});

const Expense=mongoose.model('Expense',ExpenseSchema);
module.exports=Expense;