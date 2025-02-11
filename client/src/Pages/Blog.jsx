import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Wrapper from '../Common/Wrapper'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import { blogList, deleteblog } from './apicall';
import { useEffect } from 'react';
import Loader from '../Common/Loader';

const Blog = () => {

    const dispatch = useDispatch();
    const { blogdata, totalpage, loading } = useSelector((state) => state.Showblog);// Data get from store
    const [currentPage, setCurrentPage] = useState(1); // Current page

    // Handle For Pagination
    const handleOnChange = (e, pageno) => {
        setCurrentPage(pageno);
    };

    // Handle For Delete
    const handleDelete = async (id) => {
        await deleteblog(id);
        dispatch(blogList({ page: currentPage, perpage: 10 })); // Substitute of refetch
    }

    useEffect(() => {
        dispatch(blogList({ page: currentPage, perpage: 10 }));
    }, [currentPage])

    if (loading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}><Loader /></h1>
    }

    console.log("Bloggg", blogdata)

    return (
        <>
            <Wrapper>
                {/* <!-- ======= Blog Section ======= --> */}
                <section id="blog" class="blog" style={{ marginTop: '50px' }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 entries">

                                {Array.isArray(blogdata) && blogdata?.map((value) => {
                                    return (
                                        <>
                                            <article class="entry" data-aos="fade-up">
                                                <div class="entry-img">
                                                    <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" class="img-fluid" style={{ width: '100%' }} />
                                                </div>

                                                <h2 class="entry-title">
                                                    <a href="blog-single.html">{value?.title}</a>
                                                </h2>

                                                <div class="entry-meta">
                                                    <ul>
                                                        <li class="d-flex align-items-center"><i class="icofont-user"></i> <a href="blog-single.html">{value?.authorDetails?.name}</a></li>
                                                        <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">{new Date(value?.createdAt).toLocaleDateString('en-GB')}</time></a></li>
                                                        <li class="d-flex align-items-center"><i class="icofont-comment"></i> <a href="blog-single.html">{value?.comments?.length}</a></li>
                                                    </ul>
                                                </div>

                                                <div class="entry-content">
                                                    <p>
                                                        {value?.description.slice(0, 200)}
                                                    </p>
                                                    <div class="read-more">
                                                        <Link to={`/blogdetails/${value?._id}`}>Read More</Link>
                                                    </div>
                                                </div>

                                            </article>
                                        </>
                                    )
                                })}

                                <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                                    <Grid justifyContent="center">
                                        {blogdata?.length !== 0 ? (
                                            <Pagination
                                                count={totalpage}
                                                page={currentPage}
                                                onChange={handleOnChange}
                                                variant="outlined"
                                                shape="rounded"
                                            />
                                        ) : null}
                                    </Grid>
                                </Box>

                            </div>
                            {/* <!-- End blog entries list --> */}

                            <div class="col-lg-4">
                                <Sidebar />
                            </div>
                            {/* <!-- End blog sidebar --> */}

                        </div>

                    </div>
                </section>
                {/* <!-- End Blog Section --> */}
            </Wrapper>
        </>
    )
}

export default Blog
