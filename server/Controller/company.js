import Program from "../Models/Program.js";
// get companys all programs
export const getCompnayPrograms = async(req,res) =>{
    try {
        const companyId = req.company.id;

        // validate the id
        if(!companyId){
            return res.status(400).json({
                success:false,
                message: "Request id not found"
            })
        }

        // find programs
        const programs = await Program.find({company: companyId})

        // validate programs
        if(!programs){
            return res.status(400).json({
                success: false,
                message: "No programs found!",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Fetched Programs for the company",
            programs
        })
    } catch (error) {
        console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting Programs Data",
    })
    }
} 
