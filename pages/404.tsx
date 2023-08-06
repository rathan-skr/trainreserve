// pages/404.tsx
import React from "react";
import Router from "next/router";

const NotFoundPage: React.FC = () => {
  if (typeof window !== "undefined") {
 //Router.replace('/Authentication/Login'); // Redirect to login page for any unauthorized access
  }

  return (
    <>
      {" "}
      <div className="container_404">
        <section className="page_404">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Page Not found</h3>

                  <p>the page you are looking for not avaible!</p>

                  <a href="/" className="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NotFoundPage;
