import { createSlice } from "@reduxjs/toolkit";
const consultingSlice = createSlice({
  name: "consulting",
  initialState: {
    folders: [],
    files: [],
    subfolders: [],
    subSubfolder:[],
    mainFolder:localStorage.getItem('selectedFolder') || null,
    subFolder:localStorage.getItem('selectedSubFolder') || null,
    categories:[],
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
    },
    getSubSubfolders:(state,action)=>{
      state.subfolders = action.payload
    },
    getMainFolder:(state,action)=>{
      state.mainFolder=action.payload
    },
    getSubFolder:(state,action)=>{
      state.subFolder=action.payload
    },
    getCategoriesForMainFolder:(state,action)=>{
      state.categories=action.payload
    },
  }

});
export const {
    getFolders,
    getFiles,
    getMainFolder,
    getSubFolders,
    getSubFolder,
    getSubSubfolders
} = consultingSlice.actions;
export default consultingSlice.reducer;