import Program from '../Models/Program.js'
import mongoose from 'mongoose'

export const createProgram = async (req, res) => {
  try {
    const { type, title, company } = req.body;

    if (!type || !title || !company) {
      return res.status(400).json({ message: 'Type, title and company are required' });
    }

    // Validate company ID format
    if (!mongoose.Types.ObjectId.isValid(company)) {
      return res.status(400).json({ message: 'Invalid company ID format' });
    }

    const newProgram = new Program({ 
      type, 
      title, 
      company,
      description: "" // Add default description
    });

    await newProgram.save();

    return res.status(201).json({ 
      message: 'Program created', 
      data: newProgram 
    });
  } catch (err) {
    console.error('Create Program Error:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
}

export const updateProgramById = async (req, res) => {
  try {
    // Helper function to safely parse JSON
    const safeParse = (value) => {
      if (!value || value === 'null') return null;
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch (e) {
        console.warn(`Failed to parse value:`, value);
        return null;
      }
    };9

    // console.log("Update request body:", req.body);

    const updateData = {
      title: req.body.title,
      guidelines: req.body.guidelines,
      areasOfConcern: req.body.concerns,
      policy: req.body.policy,
      additionalDetails: req.body.additionalDetails,
      type: req.body.type,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      assets: safeParse(req.body.scope),
      brand: req.body.brand,
      bountyRange:req.body.bounty,
      // description: req.body.description || ""
    };
    const programId = req.params.id;
    // console.log(programId, "Program ID from params");
    // console.log("Update data:", updateData);
    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );

    if (!updatedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ message: "Program updated", data: updatedProgram });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ 
      message: "Update failed", 
      error: error.message,
      receivedData: req.body
    });
  }
};

export const getProgramsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    const programs = await Program.find({ company: companyId })
      .populate("company")
      .populate("invitedHackers")
      // .populate("scope");

    res.status(200).json({ 
      message: "Programs fetched successfully", 
      data: programs // Note: sending direct array, not wrapped in data property
    });
  } catch (err) {
    console.error("Error fetching programs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProgramByIds = async (req, res) => {
  try {

    const id = req.params.programId;
   

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid program ID format' });
    }

    const program = await Program.findById(id);
    console.log("Fetched program:", program);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

  
    res.status(200).json({ message: 'Program fetched successfully', data: program });
  } catch (error) {
    console.error("Fetch Program Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

