import { asyncHandler} from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async (req , res) =>{
    res.Status(200).json({
        message: "Ok"
    });
})

export default{registerUser}