const Expense=require('../Models/Expense');
const express=require('express');
const router=express.Router();
const nodemailer = require('nodemailer');


router.post('/addExp',async (req,res)=>{
try{
    const {email,title,amount,category,date,description}=req.body;
    const newExp=new Expense({
        email,title,amount,category,date,description
    })
    await newExp.save()
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'Ayinavolumanvitha@gmail.com',
          pass: 'yhnv gjkm temz edtd'
        }
      });
  
      const mailOptions = {
        from: 'Ayinavolumanvitha@gmail.com',
        to: email,
        subject: 'Expense Added',
        text: `You have added a new expense: \nTitle: ${title}\nAmount: ${amount}\nCategory: ${category}\nDate: ${date}\nDescription: ${description}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ msg: 'Error sending email', error });
        }
        res.status(201).json({ msg: 'Expense added and email sent successfully' });
      });
    } catch (err) {
      return res.status(500).json({ msg: 'Error occurred', err });
    }
  });


  router.get('/getExp/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const expenses = await Expense.find({ email });
      
      console.log(expenses)
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ msg: 'Error occurred', err });
    }
  });
  router.put('/updateExp/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Ensure the parameter name is 'id'
        const { title, amount, category, date, description } = req.body;

        // Find and update the expense by ID
        const updatedExpense = await Expense.findByIdAndUpdate(id, {
            title, amount, category, date, description
        }, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        res.status(200).json(updatedExpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error occurred', err });
    }
});

router.delete('/deleteExp/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await Expense.findByIdAndDelete(id);
      res.status(200).json({ msg: 'Expense deleted successfully' });
  } catch (err) {
      res.status(500).json({ msg: 'Error occurred', err });
  }
});


module.exports=router