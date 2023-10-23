import { addData } from "@backend/utils";

const route =  async (req, res) => {
    try {
        // await addData()
        // console.log("data added");
        res.status(200).json({msg:"Server Connected 🚀🚀"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal Server Error"})
    }
}

export default route