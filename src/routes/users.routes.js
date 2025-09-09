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
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),(req, res, next) => {
    // Yahan par check kijiye req.body aur req.files ka status
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    // Agar email undefined aa raha hai ya avatar file missing hai to error bhej dijiye
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

export default router;
