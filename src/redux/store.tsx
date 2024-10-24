import { configureStore } from "@reduxjs/toolkit";
import filesFoldersListsSlice from "./FilesFoldersListsSlice.redux";

export default configureStore({
  reducer: {
    FilesFolders: filesFoldersListsSlice,
  },
});
