import Program from '../Models/Program.js'

export const createProgram = async (req, res) => {
  try {
    // Check if data exists
    if (!req.body.title || !req.body.type) {
      return res.status(400).json({ message: 'Title and type are required' })
    }

    const programData = req.body
    const program = new Program(programData)
    await program.save()

    res.status(201).json({ message: 'Program created successfully!' })
  } catch (error) {
    console.error('Error in createProgram:', error) 
    res
      .status(500)
      .json({ message: 'Internal server error while creating the program' })
  }
}
