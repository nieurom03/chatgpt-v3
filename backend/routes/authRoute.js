const express = require("express");
const router = express.Router();
const  { authGoogle } = require ("../controllers/authGoogleController.js");

router.post('/google',authGoogle);

module.exports = router;
