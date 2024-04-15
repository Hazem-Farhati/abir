import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";



/*==== CreateProject =====*/


export const createProject = createAsyncThunk(
    "project/createproject",
    async (data, { rejectWithValue }) => {
      try {
        console.log("data", data);
        const response = await axios.post("/project/createproject", data);
        console.log("data", data);
        toast.success(`Project Creation success`);
        return response;
      } catch (error) {
        toast.error(error.response.data.message);
  
        return rejectWithValue(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
  );
/*==== CreateProject =====*/


// Define the initial state
const initialState = {
    projectsList: [],
    projectInfo: {},
    errors: null,
    loading: false,
    isActive: false,
};

// Define the project slice
const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
         /*==== createproject =====*/
        builder
           
            .addCase(createProject.fulfilled, (state) => {
                state.errors = null;
                state.loading = false;
                state.isActive = true;
            })
            .addCase(createProject.rejected, (state, action) => {
              
                state.errors = action.payload;
                
            });
    },
});

export default projectSlice.reducer;
