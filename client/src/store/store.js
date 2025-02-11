import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Auth/authslice" // In this case we use { } because we not do export default only do export
import blogslicers from "../Pages/apicall"



export const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer, // Reducer for Auth 
        Showblog: blogslicers
    },
});