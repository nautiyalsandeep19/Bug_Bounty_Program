import Program from "../Models/Program.js";

export const createInitialProgram = async (req, res) => {
  try {
    const { title, type, company } = req.body;
    console.log(`${title} ${type} ${company}`);

    if (!title || !type || !company) {
      return res
        .status(400)
        .json({ message: "Title, type, and company are required" });
    }

    const program = new Program({ title, type, company });
    const saved = await program.save();

    return res
      .status(201)
      .json({ message: "Initial program created", programId: saved._id });
  } catch (error) {
    console.error("Error creating initial program:", error);
    return res
      .status(500)
      .json({ message: "Server error while creating program" });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const programId = req.params.id;
    const updates = req.body;

    const updatedProgram = await Program.findByIdAndUpdate(programId, updates, {
      new: true,
    });

    if (!updatedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }

    return res
      .status(200)
      .json({ message: "Program updated", program: updatedProgram });
  } catch (error) {
    console.error("Error updating program:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating program" });
  }
};

export const fetchAllPrograms = async (req, res) => {
  try {
    const publicPrograms = await Program.find({ visibility: "public" });

    res.status(200).json({
      success: true,
      count: publicPrograms.length,
      programs: publicPrograms,
    });
  } catch (error) {
    console.error("Error fetching public programs:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching programs",
    });
  }
};

export const fetchPrivateProgramsForHacker = async (req, res) => {
  try {
    if (!req.user || req.user.userType !== "hacker") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only hackers can access private programs.",
      });
    }

    const hackerId = req.user.id;

    const programs = await Program.find({
      visibility: "private",
      invitedHackers: hackerId,
    });

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs,
    });
  } catch (error) {
    console.error("Error fetching private programs for hacker:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching private programs",
    });
  }
};
