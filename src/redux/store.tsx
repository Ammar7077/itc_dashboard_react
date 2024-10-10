import { configureStore } from "@reduxjs/toolkit";
import consultingReducer from "./consulting/consultingSlice"

export default configureStore({
  // the reducer object is empty for now but after creating reducers we add them to this object
  reducer: {
    consulting:consultingReducer,
  },
});