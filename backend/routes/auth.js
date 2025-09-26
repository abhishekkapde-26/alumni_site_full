const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models/db');

router.post('/register', async (req,res)=>{
  const {email,password} = req.body;
  if(!email || !password) return res.status(400).json({error:'Missing fields'});
  const hashed = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users(email,password) VALUES(?,?)',[email,hashed], function(err){
    if(err) return res.status(400).json({error:err.message});
    res.json({id:this.lastID, email});
  });
});

router.post('/login',(req,res)=>{
  const {email,password} = req.body;
  db.get('SELECT * FROM users WHERE email=?',[email], async (err,row)=>{
    if(err||!row) return res.status(400).json({error:'Invalid'});
    const match = await bcrypt.compare(password,row.password);
    if(!match) return res.status(400).json({error:'Invalid'});
    const token = jwt.sign({id:row.id,email}, process.env.JWT_SECRET);
    res.json({token});
  });
});

module.exports = router;