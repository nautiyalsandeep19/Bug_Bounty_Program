import Program from "../Models/Program.js";

export const createProgram = async (req, res) => {
  try {
    const programData = req.body;

    const program = new Program({
      title: programData.title,
      description: programData.description,
      company: programData.company,
      visibility: programData.visibility,
      bountyRange: programData.bountyRange,
      assets: programData.assets,
      Type: programData.Type,
      startDate: programData.startDate,
      endDate: programData.endDate,
    });
    const savedProgram = await program.save();

    res.status(201).json(savedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
