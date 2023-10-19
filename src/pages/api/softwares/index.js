import { data } from "@data/softwares"
const route = async (req, res) => {
    try {
        res.status(200).json({ msg: "success", data })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

export default route