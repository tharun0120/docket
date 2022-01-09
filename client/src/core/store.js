import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../app/userSlice";
import taskReducer from "../app/taskSlice";

export default configureStore({
  reducer: {
    userState: userReducer,
    taskState: taskReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
