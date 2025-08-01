import Program from '../models/Program.js'
import Hacker from '../models/Hacker.js'

export const updateProgramLeaderBoard = async (programId, hackerId, points) => {
  if (!programId || !hackerId || typeof points !== 'number') return

  const program = await Program.findById(programId)

  if (!program) return

  const existingEntry = program.leaderboard.find(
    (entry) => entry.hacker.toString() === hackerId.toString()
  )
  if (existingEntry) {
    existingEntry.score += points
  } else {
    program.leaderboard.push({ hacker: hackerId, score: points })
  }

  await program.save()
}

export const updateGlobalLeaderBoard = async (hackerId, points) => {
  if (!hackerId || typeof points !== 'number') return

  try {
    const hacker = await Hacker.findById(hackerId)
    if (!hacker) {
      console.log('Hacker not found')
      return
    }

    hacker.totalPoints += points
    await hacker.save()

    // console.log(`Updated ${hacker.name}'s points to ${hacker.totalPoints}`);
  } catch (error) {
    console.error('Error updating global leaderboard:', error.message)
  }
}
