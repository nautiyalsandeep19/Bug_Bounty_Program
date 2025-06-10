// programSlice.js or wherever you define your slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch program by ID
// export const fetchProgramById = createAsyncThunk(
//   'program/fetchProgramById',
//   async (programId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`/api/programs/Programs/${programId}`);
//       console.log("Fetched program data:", res.data);
//       return res.data.data; // only return the "data" part
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

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
      state.programData = action.payload;
    },
  },
});

export const { setProgramData } = programSlice.actions;
export default programSlice.reducer;
