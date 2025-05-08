// import Program from '../Models/Program.js';

// export const createProgram = async (req, res) => {
//   try {
//     const { title, description, company, visibility, type, startDate, endDate, guidelines, areasOfConcern, bountyRange, assets, invitedHackers } = req.body;
//     const logo = req.files?.logo ? req.files.logo[0].path : null;

//     // Save the program data
//     const program = new Program({
//       title,
//       description,
//       company,
//       visibility,
//       type,
//       startDate,
//       endDate,
//       guidelines,
//       areasOfConcern,
//       bountyRange,
//       assets,
//       invitedHackers,
//       logo
//     });

//     await program.save();

//     return res.status(201).json({ message: "Program created successfully", program });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error creating program", error: err.message });
//   }
// };
import Program from '../Models/Program.js';

export const createProgram = async (req, res) => {
  try {
    // Check if data exists
    if (!req.body.title || !req.body.type) {
      return res.status(400).json({ message: "Title and type are required" });
    }

    const programData = req.body;
    const program = new Program(programData);
    await program.save();

    res.status(201).json({ message: "Program created successfully!" });
  } catch (error) {
    console.error("Error in createProgram:", error); // Log the error
    res.status(500).json({ message: "Internal server error while creating the program" });
  }
};

