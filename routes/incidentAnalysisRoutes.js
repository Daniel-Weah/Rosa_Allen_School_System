// This is our analysis routes
const express = require("express");
const router = express.Router();
const db = require("../model/db");

router.get("/analysis", (req, res) => {
 if (!req.session.user) {
  return res.redirect('/');
 }

  db.get(`SELECT * FROM users WHERE id = ?`, [req.session.user.id], (err, user) => {
   if (err) {
       console.error('Error occurred while fetching user data:', err);
       return res.send('Error occurred while fetching user data');
   }

   if (!user) {
       return res.send('User not found');
   }

   const base64Image = user.profile_picture.toString('base64');
   const imageSrc = `data:image/png;base64,${base64Image}`;

   res.render('Analysis', { userProfile: imageSrc });
});
});

module.exports = router;