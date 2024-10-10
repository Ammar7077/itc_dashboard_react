import { createSlice } from "@reduxjs/toolkit";
const consultingSlice = createSlice({
  name: "consulting",
  initialState: {
    folders: [],
    files: [],
    subfolders: [],
  },
  reducers: {
    getFolders: (state,action)=>{
        state.folders=action.payload;
    },

    getFiles :(state,action)=>{
        state.files =action.payload;
    },
    getSubFolders:(state,action)=>{
      state.subfolders = action.payload
    }
  }

});
export const {
    getFolders,
    getFiles
} = consultingSlice.actions;
export default consultingSlice.reducer;