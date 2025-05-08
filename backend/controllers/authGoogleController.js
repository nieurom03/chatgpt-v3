const { OAuth2Client } = require( 'google-auth-library');
const   User  = require('../models/User');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const authGoogle = async (req, res) => {
    const { credential } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      let payload = ticket.getPayload();
      
      // console.log('body', req.body, payload);
      // luu vao db
      let user = await User.findOne({email: payload?.email});
      // console.log('user', user, payload);
      // neu chua co thi tao moi
      if(!user){ 
        user = new User({
          name: payload.name,
          email: payload.email,
          given_name: payload.given_name,
          family_name: payload.family_name,
          picture: payload.picture,
          payload
        });
      }
      else {
        // neu ton tai thi update
        user.name =  payload.name
          user.email = payload.email;
          user.given_name= payload.given_name;
          user.family_name = payload.family_name;
          user.picture = payload.picture;
          user.payload= payload;
      }
      const data = await user.save();
      payload.userId = data?._id
      res.json({ success: true, user: payload}); // trả về thông tin user
    } catch (err) {
      res.status(401).json({ success: false, error: 'Invalid token' });
    }
  }

module.exports ={
  authGoogle
}