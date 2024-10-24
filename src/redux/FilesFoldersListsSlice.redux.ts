import { createSlice } from "@reduxjs/toolkit";

const filesFoldersListsSlice = createSlice({
  name: "FilesFolders",
  initialState: {
    folders: [],
    files: [],
    filteredFiles: [],
    filteredFolders: [],
  },
  reducers: {
    // -------- Folders --------- //
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    // -------- Files --------- //
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    // -------- Filtered Files --------- //
    setFilteredFiles: (state, action) => {
      state.filteredFiles = action.payload;
    },
    // -------- Filtered Folders --------- //
    setFilteredFolders: (state, action) => {
      state.filteredFolders = action.payload;
    },
  },
});
export const {
  // ----
  setFolders,
  // ----
  setFiles,
  // ----
  setFilteredFiles,
  // ----
  setFilteredFolders,
  // ----
} = filesFoldersListsSlice.actions;
export default filesFoldersListsSlice.reducer;
