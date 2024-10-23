import { createSlice } from "@reduxjs/toolkit";

const ConsultingsSlice = createSlice({
  name: "Consultings",
  initialState: {
    folders: [],
    files: [],
    subfolders: [],
    subSubfolder:[],
    mainFolder:localStorage.getItem('selectedConsultingsFolder') || null,
    subFolder:localStorage.getItem('selectedConsultingsSubFolder') || null,
    categories:[],
    fileInfo:null
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
    getFileInfo:(state,action)=>{
      state.fileInfo= action.payload
    },
    clearFiles: (state) => {
      state.files = []; 
    },
  }

});
export const {
    getFolders,
    getFiles,
    getMainFolder,
    getSubFolders,
    getSubFolder,
    getSubSubfolders,
    getFileInfo,
    clearFiles
} = ConsultingsSlice.actions;
export default ConsultingsSlice.reducer;