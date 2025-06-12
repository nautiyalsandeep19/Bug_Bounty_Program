// programSlice.js or wherever you define your slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Slice
const programSlice = createSlice({
  name: 'program',
  initialState: {
    programData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProgramData: (state, action) => {
      state.programData = action.payload
    },
  },
})

export const { setProgramData } = programSlice.actions
export default programSlice.reducer
