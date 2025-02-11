import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { searchblog } from './apicall';
import { useForm } from "react-hook-form"; // Import React Hook Form

const Search = () => { 

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [search, setSearch] = useState([]);

    const onSubmit = async (data, e) => {
        e.preventDefault(); // For to stop default behavour

        // Handling Data
        const searchdata = {
            search: data.search
        }

        try {
            const response = await searchblog(searchdata)
            console.log("Blog search response...", response);
            setSearch(response);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }

    return (
        <>
            <h3 class="sidebar-title">Search</h3>
            <div class="sidebar-item search-form">
                <form action="POST" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("search")} name='search' id='search' />
                    <button type="submit"><i class="icofont-search"></i></button>
                </form>
            </div>
            <div class="sidebar-item recent-posts">
                {search?.map((value) => {
                    return (
                        <>
                            <div class="post-item clearfix">
                                <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" style={{ height: '50px' }} />
                                <h4><Link to={`/blogdetails/${value?._id}`}>{value?.title}</Link></h4>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Search 
