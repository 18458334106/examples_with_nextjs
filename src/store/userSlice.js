import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { login } from "@/api/user";
import { getToken, removeToken, setToken } from '../utils/auth';

export const loginFn = createAsyncThunk('user/login', async (params) => {
    const res = await login(params)
    return res.data
})

const userSlice = createSlice({
    name:'userSlice',
    initialState:{
        userInfo:{},
        token:getToken() || '',
        loginView:false
    },
    reducers:{
        showLogin:(state,action) => {
            state.loginView = action.payload
        },
        getUserInfo:(state,action) => {
            state.userInfo = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginFn.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.token = action.payload
            state.loginView = false
            setToken(action.payload)
        })
    }
})
export const { showLogin,getUserInfo } = userSlice.actions
export default userSlice.reducer