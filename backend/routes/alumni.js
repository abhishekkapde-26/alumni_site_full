const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models/db');

function auth(req,res,next){
  const h = req.headers['authorization'];
  if(!h) return res.sendStatus(401);
  const token = h.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
    if(err) return res.sendStatus(403);
    req.user=user; next();
  });
}

router.get('/me', auth, (req,res)=>{
  db.get('SELECT * FROM alumni WHERE user_id=?',[req.user.id], (err,row)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json(row||{});
  });
});

router.post('/me', auth, (req,res)=>{
  const {name,year_of_passing,sector,achievements,reminders} = req.body;
  db.run(`INSERT INTO alumni(user_id,name,year_of_passing,sector,achievements,reminders) 
          VALUES(?,?,?,?,?,?)
          ON CONFLICT(user_id) DO UPDATE SET 
            name=excluded.name, year_of_passing=excluded.year_of_passing,
            sector=excluded.sector, achievements=excluded.achievements,
            reminders=excluded.reminders`,
          [req.user.id,name,year_of_passing,sector,achievements,reminders],
          err=>{
            if(err) return res.status(500).json({error:err.message});
            res.json({message:'Saved'});
          });
});

router.get('/search',(req,res)=>{
  const q = '%' + (req.query.q||'') + '%';
  db.all('SELECT * FROM alumni WHERE name LIKE ? OR email LIKE ? OR sector LIKE ?',[q,q,q],(err,rows)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json(rows);
  });
});

module.exports = router;