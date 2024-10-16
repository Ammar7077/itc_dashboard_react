import { configureStore } from "@reduxjs/toolkit";
import aisReducer from "./AI/aisSlice"
import JSONLsReducer from './JSONLs/JSONLsSlice'
import consultingsReducer from './Consultings/ConsultingsSlice'
import mediaReducer from './Media/MediaSlice'

export default configureStore({
  // the reducer object is empty for now but after creating reducers we add them to this object
  reducer: {
    ais:aisReducer,
    JSONLs:JSONLsReducer,
    Consultings:consultingsReducer,
    Media:mediaReducer
  },
});