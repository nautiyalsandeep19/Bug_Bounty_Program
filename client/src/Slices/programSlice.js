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
    updateProgramField: (state, action) => {
  const { field, value } = action.payload;
  state.programData[field] = value;
}

  },
})

export const { setProgramData, updateProgramField } = programSlice.actions
export default programSlice.reducer
