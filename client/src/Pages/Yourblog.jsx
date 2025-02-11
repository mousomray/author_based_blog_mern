import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Wrapper from '../Common/Wrapper'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import { authorwiseblog } from './apicall';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Common/Loader';

const Yourblog = () => {

  const [myblogdata, setmyBlog] = useState([])
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await authorwiseblog();
    console.log("My blog response...", response)
    setmyBlog(response);
    setLoading(false)
  }

  useEffect(() => {
    getData();
  }, [])

  if (loading) {
    return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}><Loader /></h1>
  }

  console.log("amar response...",myblogdata)

  return (
    <>
      <Wrapper>
        {/* <!-- ======= Blog Section ======= --> */}
        <section id="blog" class="blog" style={{ marginTop: '50px' }}>
          <div class="container">
            <div class="read-more">
              <button className="btn btn-sm btn-primary" style={{ marginBottom: '20px' }}><Link to='/addblog' style={{ color: 'white' }}>Add blog</Link></button>
            </div>
            <div class="row">
              <div class="col-lg-8 entries">

                {myblogdata?.length > 0 ? (
                  Array.isArray(myblogdata) &&
                  myblogdata.slice(0, myblogdata.length).reverse().map((value) => (
                    <article className="entry" data-aos="fade-up" key={value?._id}>
                      <div className="entry-img">
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}${value?.image}`}
                          alt=""
                          className="img-fluid"
                          style={{ width: '100%' }}
                        />
                      </div>

                      <h2 className="entry-title">
                        <a href="blog-single.html">{value?.title}</a>
                      </h2>

                      <div className="entry-meta">
                        <ul>
                          <li class="d-flex align-items-center"><i class="icofont-user"></i> <a href="blog-single.html">{value?.authorDetails?.name}</a></li>
                          <li className="d-flex align-items-center">
                            <i className="icofont-wall-clock"></i>{' '}
                            <a href="blog-single.html">
                              <time dateTime="2020-01-01">
                                {new Date(value?.createdAt).toLocaleDateString('en-GB')}
                              </time>
                            </a>
                          </li>
                          <li className="d-flex align-items-center">
                            <i className="icofont-comment"></i>{' '}
                            <a href="blog-single.html">{value?.comments?.length}</a>
                          </li>
                        </ul>
                      </div>

                      <div className="entry-content">
                        <p>{value?.description.slice(0, 200)}</p>
                        <div className="read-more">
                          <Link to={`/blogdetails/${value?._id}`}>Read More</Link>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>User has no blog</p>
                )}


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

export default Yourblog
