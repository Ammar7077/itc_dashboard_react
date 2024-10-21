import { createSlice } from "@reduxjs/toolkit";
const aisSlice = createSlice({
  name: "AI",
  initialState: {
    folders: [],
    files: [],
    subfolders: [],
    subSubfolder:[],
    mainFolder:localStorage.getItem('selectedAIFolder') || null,
    subFolder:localStorage.getItem('selectedAISubFolder') || null,
    categories:[],
    fileInfo:null,
    fileId:"idf",
    folderIdSub:"dsd"
  },
  reducers: {
    getFolders: (state,action)=>{
        state.folders=action.payload;
    },
    getFolderIdSub:(state,action)=>{
      state.folderIdSub=action.payload
    },
    getfolderId:(state,action)=>{
      state.fileId=action.payload;
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
    }
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
    getfolderId,
    getFolderIdSub
} = aisSlice.actions;
export default aisSlice.reducer;