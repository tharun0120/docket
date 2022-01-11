import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthClass from "../core/Auth";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isFetching: false,
  error: [],
};

const auth = new AuthClass();

const login = createAsyncThunk("/api/auth/login", (user, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .login(user)
      .then((user) => resolve(user))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const logout = createAsyncThunk("/api/auth/logout", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .logout()
      .then((message) => {
        resolve(message);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

const deleteUser = createAsyncThunk("/api/user/me/delete", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .deleteUser()
      .then((message) => {
        resolve(message);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

const register = createAsyncThunk("/api/auth/register", (user, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .register(user)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const isLoggedIn = createAsyncThunk("/api/auth/isLoggedIn", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .isLoggedIn()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

const getUser = createAsyncThunk("/api/users/me", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .getUser()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

const updateUser = createAsyncThunk(
  "/api/users/me/update",
  (toUpdate, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await auth
        .update(toUpdate)
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: {
    //login
    [login.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload;
    },
    [login.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      // console.log(payload);
      state.error = payload;
    },
    //updateUser
    [updateUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      // console.log(payload);
      state.error = payload;
    },
    //getUser
    [getUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload;
    },
    [getUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      // console.log(payload);
      state.error = payload;
    },
    //register
    [register.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload;
    },
    [register.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //logout
    [logout.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [logout.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = null;
    },
    [logout.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //delete user
    [deleteUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [deleteUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = null;
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //isLoggedin
    [isLoggedIn.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [isLoggedIn.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload;
    },
    [isLoggedIn.rejected]: (state) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
});

export { login, register, logout, isLoggedIn, updateUser, getUser, deleteUser };

export const { clearState } = userSlice.actions;

export const selectUser = (state) => state.userState;

export default userSlice.reducer;
