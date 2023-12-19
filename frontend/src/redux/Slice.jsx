import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../helper/fakeapi";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLogin: false,
    isLoading: false,
    message: null,
    dashboardUser: [],
    cartItems: [],
    count: {},
    charts: {},
    manage: []
}

export const Login = createAsyncThunk("Login", async (user, thunkAPI) => {
    try {
        if (user.username === 'user' && user.password === 'user') {
            const response = await axios.post(url + 'login', {
                username: user.username,
                password: user.password
            });
            return response.data;
        } else if (user.username === 'admin' && user.password === 'admin') {
            const response = await axios.post(url + 'loginAdmin', {
                username: user.username,
                password: user.password
            });
            return response.data;
        }
        else {
            await axios.post(url + 'loginfail')
        }
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const RegisterUser = createAsyncThunk("RegisterUser", async (data, thunkAPI) => {
    try {
        const response = await axios.post(url + 'register', data);
        // console.log(data)
        if (data.password === data.passwordConfirm) {
            return response.data;
        }
        else {
            await axios.post(url + 'registerfail')
        }
    } catch (error) {
        if (error.response) {
            // console.log(error.response)
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("getMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + 'me');
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("Logout", async () => {
    await axios.delete(url + 'logout');
});

export const updateUser = createAsyncThunk("user/updateUser", async (data, thunkAPI) => {
    try {
        const response = await axios.put(url + 'updateUser', data);
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const updateAdmin = createAsyncThunk("updateProfil", async (data, thunkAPI) => {
    try {
        const response = await axios.put(url + 'updateAdmin', data);
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const dashboardUser = createAsyncThunk("dashboardUser", async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + 'dashboardUser');
        return response.data;
    } catch (error) {
        if (error.response) {
            // console.log(error.response)
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const addToCart = createAsyncThunk("addToCart", async (product, thunkAPI) => {
    try {
        thunkAPI.dispatch(addToCartLocally(product));
        const response = await axios.post(url + 'addToCart')
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getCount = createAsyncThunk("count", async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + 'count')
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
})
export const getCharts = createAsyncThunk("charts", async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + 'charts')
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
})
export const getManage = createAsyncThunk("manage", async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + 'manage')
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        reset: (state) => initialState,
        addToCartLocally: (state, action) => {
            state.cartItems = [...state.cartItems, action.payload];
        },
        removeFromCartLocally: (state, action) => {
            const productIdToRemove = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== productIdToRemove);
        },
    },
    extraReducers: (builder) => {
        // Post Login
        builder.addCase(Login.pending, (_) => { });
        builder.addCase(Login.fulfilled, (state, action) => {
            state.isLogin = true;
            state.isError = false;
            state.message = null;
            state.user = action.payload;
        });
        builder.addCase(Login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Post Register
        builder.addCase(RegisterUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get Count
        builder.addCase(getCount.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.count = action.payload;
        });
        builder.addCase(getCount.rejected, (state, action) => {
            state.isLoading = false;
            state.count = action.payload;
        })

        // Get Chart
        builder.addCase(getCharts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCharts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.charts = action.payload;
        });
        builder.addCase(getCharts.rejected, (state, action) => {
            state.isLoading = false;
            state.charts = action.payload;
        })

        // Get Manage
        builder.addCase(getManage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getManage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.manage = action.payload;
        });
        builder.addCase(getManage.rejected, (state, action) => {
            state.isLoading = false;
            state.manage = action.payload;
        })

        // Update Profile user
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        // Update Profil Admin
        builder.addCase(updateAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(updateAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(dashboardUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(dashboardUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dashboardUser = action.payload;
        });
    }
});

export const { reset, addToCartLocally, removeFromCartLocally } = storeSlice.actions;
export default storeSlice.reducer;