import { createSlice } from "@reduxjs/toolkit";

const JSONLsSlice = createSlice({
  name: "JSONLs",
  initialState: {
    folders: [],
    files: [],
    subfolders: [],
    subSubfolder:[],
    mainFolder:localStorage.getItem('selectedJSONLsFolder') || null,
    subFolder:localStorage.getItem('selectedJSONLsSubFolder') || null,
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
} = JSONLsSlice.actions;
export default JSONLsSlice.reducer;