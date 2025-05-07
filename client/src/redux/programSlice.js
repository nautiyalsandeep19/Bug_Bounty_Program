import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProgram = createAsyncThunk('program/createProgram', async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://localhost:8000/api/programs/create', formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const programSlice = createSlice({
  name: 'program',
  initialState: { loading: false, error: null, program: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProgram.pending, (state) => { state.loading = true; })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.program = action.payload;
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default programSlice.reducer;