import React, { Children, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/footer';

const Layout = ({children}) => {
  console.log("Hello"); // You can remove this console.log if not needed

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto px-4 py-8">
            {children}
            <Outlet />
          </div>
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
