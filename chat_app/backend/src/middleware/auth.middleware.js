import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// validates the cookie jwt token by using jwt.verify() passing token and the secret key
// this checks if the token is present, if it id valid,and if user is found with the user id present in token
// ones all checks are good, it will put the user in the request and goes on to next() function
// the actions by which database would get changed need to be authorized that why use protectRoute function and beforehand validate user using the jwt token sent

export const protectRoute = async (req, res, next) =>{
   try {
         
      const token = req.cookies.jwt;

      if(!token){
        return res.status(401).json({message: "Unauthorized - no token provided"})
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET )  // jwt.verify(token, secret)

                            // jwt.verify()  if verified, this return payload that was used to sign the token
                                        //   like userId
      if(!decoded) {
        return res.status(401).json({message: "Unauthorized - invalid token"})
      }

      const user = await User.findById(decoded.userId).select("-password") // doesnt send password

      if(!user){
        return res.status(404).json({message: "User not found"})
      }

      req.user = user;
      next();

   } catch (error) {
    console.log("Error in protectroute middleware", error.message);
    res.status(500).json({message: "Internal server error"})
   }
}