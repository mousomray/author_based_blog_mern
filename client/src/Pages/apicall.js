import { myendpoints } from "../endpoint/endpoint"
import axiosInstance from '../api/api'
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetching dashboard 
export const fetchDashboard = async () => {
    try {
        const apiurl = myendpoints[15];
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching dashboard data...", response);
        return response?.data?.user
    } catch (error) {
        console.log("Error fetching dashboard data...", error);

    }
}

// Fetching Add data 
export const addblog = async (data) => {
    try {
        const apiurl = myendpoints[3];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching add blog data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching blog data", error);
        toast.error(error?.response?.data?.errors[0]);
    }
}

// Fetching read data 

export const blogList = createAsyncThunk("bloglist", async ({ page, perpage }, { rejectWithValue }) => {
    try {
        const apiurl = `${myendpoints[2]}?page=${page}&perpage=${perpage}`;
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching blog list data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching blog list data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice for blog list area start
const blogslicers = createSlice({
    name: "blogslicers",
    initialState: {
        blogdata: [],
        totalpage: "", // Make For Pagination 
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder

            .addCase(blogList.pending, (state) => {
                state.loading = true;
            })

            .addCase(blogList.fulfilled, (state, action) => {
                state.loading = false;
                state.blogdata = action.payload.blogs;
                state.totalpage = action.payload.pagination.totalPage; // For Pagination
            })

            .addCase(blogList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default blogslicers.reducer;

// Recent blog
export const recentblog = async () => {
    try {
        const apiurl = myendpoints[6];
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching recent data...", response);
        return response?.data?.blogs
    } catch (error) {
        console.log("Error fetching recent data", error);
    }
}

// Authorwise blog
export const authorwiseblog = async () => {
    try {
        const apiurl = myendpoints[7];
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching authorwise blog data...", response);
        return response?.data?.blogs
    } catch (error) {
        console.log("Error fetching update data", error);
    }
}

// Fetch Single Blog 
export const singleblog = async (id) => {
    try {
        const apiurl = `${myendpoints[2]}/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching single task...", response);
        return response?.data?.blog[0]
    } catch (error) {
        console.log("Error fetching single task...", error);
    }
}

export const editblog = async ({ formdata, id }) => {
    try {
        const apiurl = `${myendpoints[5]}/${id}`
        const response = await axiosInstance.put(apiurl, formdata)
        console.log("Fetching Update data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error Fetching update blog...", error);
        toast.error(error?.response?.data?.message);
    }
}

// Delete Function 
export const deleteblog = async (id) => {
    try {
        const apiurl = `${myendpoints[6]}/${id}`
        const response = await axiosInstance.delete(apiurl)
        console.log("Fetching Delete data...", response);
        toast.warn(response?.data?.message);
        return response
    } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log("Error fetching Delete data...", error);
    }
}

// Fetching Search data 
export const searchblog = async (data) => {
    try {
        const apiurl = myendpoints[9];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching add blog data...", response);
        return response?.data?.blogs
    } catch (error) {
        console.log("Error fetching blog data", error);
        toast.error(error?.response?.data?.errors[0]);
    }
}

// Verify OTP 
export const verifyotp = async (data) => {
    try {
        const apiurl = myendpoints[7];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching verify data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching verify data", error);
        toast.error(error?.response?.data?.message);
    }
}

// Update Password 
export const updatepassword = async (data) => {
    try {
        const apiurl = myendpoints[14];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching update data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching update data", error);
        toast.error(error?.response?.data?.message);
    }
}

// Reset link for forget password 
export const resetpasswordlink = async (data) => {
    try {
        const apiurl = myendpoints[12];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching email verify data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching email verify data", error);
        toast.error(error?.response?.data?.message);
    }
}

// Forget Password 
export const forgetpassword = async (data, id, token) => {
    try {
        const apiurl = `${myendpoints[13]}/${id}/${token}`;
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching forget data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching forget data", error);
        toast.error(error?.response?.data?.message);
    }
}

// Show comment 
export const showcomment = async (id) => {
    try {
        const apiurl = `${myendpoints[4]}/${id}`;
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching show comment data...", response);
        return response?.data?.blog?.comments
    } catch (error) {
        console.log("Error fetching show comment data", error);
    }
}

// Add comment 
export const addcomment = async (data, id) => {
    try {
        const apiurl = `${myendpoints[5]}/${id}`;
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching add comment data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching add comment data", error);
        toast.error(error?.response?.data?.errors[0]);
    }
}

