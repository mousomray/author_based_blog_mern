import React from 'react'
import { Link } from 'react-router-dom'
import { recentblog } from './apicall'
import { useQuery } from '@tanstack/react-query';
import Search from './Search';

const Sidebar = () => {

    const recentData = async () => {
        const response = await recentblog();
        console.log("Recent response...", response);
        return response;
    }

    const { isLoading, isError, data: mydata } = useQuery({
        queryKey: ["recentdata"],
        queryFn: recentData
    })

    console.log("Amar data..", mydata)

    return (
        <>
            <div class="sidebar" data-aos="fade-left">

                <Search />

                {/* <!-- End sidebar categories--> */}
                <h3 class="sidebar-title">Recent Posts</h3>
                <div class="sidebar-item recent-posts">

                    {mydata?.slice(0, 10).map((value) => {
                        return (
                            <>
                                <div class="post-item clearfix">
                                    <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" />
                                    <h4><Link to={`/blogdetails/${value?._id}`}>{value?.title}</Link></h4>
                                    <time datetime="2020-01-01">{new Date(value?.createdAt).toLocaleDateString('en-GB')}</time>
                                </div>
                            </>
                        )
                    })}

                </div>
                {/* <!-- End sidebar recent posts--> */}
            </div>
        </>
    )
}

export default Sidebar
