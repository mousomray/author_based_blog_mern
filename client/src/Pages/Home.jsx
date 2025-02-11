import React from 'react';
import Wrapper from '../Common/Wrapper';

const Home = () => {
  return (
    <Wrapper>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)'
        }}></div>
        <img 
          src="https://c8.alamy.com/comp/ERMBBJ/blogging-website-and-internet-concept-banner-with-blog-word-sign-on-ERMBBJ.jpg" 
          alt="Blog Banner" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(70%)'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome to Our Blog</h1>
          <p style={{ fontSize: '1.2rem', margin: 0 }}>Discover insights, tips, and stories to inspire your journey.</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
