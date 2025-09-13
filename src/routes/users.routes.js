// import { Router} from "express";
// import { registerUser } from "../controllers/user.controllers.js";
// import {upload} from "../middlewares/multer.js"
// const router = Router();

// router.route("/register").post(
//     upload.fields([
//         {
//             name:"avatar",
//             maxCount:1
//         },
//         {
//             name:"coverImage",
//             maxCount:1
//         }

//     ]),
//     registerUser)


// export default router;

import { Router } from "express";
import { registerUser,loginUser ,logoutUser,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),(req, res, next) => {
   
    
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

   
    if (!req.body.email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!req.files?.avatar) {
      return res.status(400).json({ error: "Avatar file is required" });
    }
    next();
  },
  registerUser
);
//login route
router.post("/login",loginUser)

//secured routes 
  router.route("/logout").post(verifyJWT,logoutUser)
  router.route("/refresh-token").post(refreshAccessToken)
  router.route("/change-password").post(verifyJWT,changeCurrentPassword)
  router.route("/current-user").get(verifyJWT,getCurrentUser)
  router.route("/update-account").patch(verifyJWT,updateAccountDetails)
  router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
  router.route("/cover-image").patch(verifyJWT,upload.single("/coverImage"),updateUserCoverImage)

  router.route("c/:username").get(verifyJWT,getUserChannelProfile)
  router.route("/history").get(verifyJWT,getWatchHistory)
export default router;
