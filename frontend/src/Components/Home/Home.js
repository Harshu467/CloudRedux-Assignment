import './home.css'

import { useEffect, useRef, useState } from 'react'
import AOS from "aos"
import "aos/dist/aos.css"


const Home = () => {
  
  const [pageLoading, setPageLoading] = useState(false)
  useEffect(() => {
    AOS.init()
    AOS.refresh()

  }, [])





  const progressBarHandler = () => {
    const totalScroll = document.documentElement.scrollTop
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scroll = `${totalScroll / windowHeight}`
    const progressBar = document.getElementById('progressBar')
    progressBar.style.transform = `scale(${scroll},1)`
    progressBar.style.opacity = `${scroll}`
  }
  window.addEventListener('scroll', progressBarHandler)


  const backtopRef = useRef()
  window.addEventListener('scroll', () => {
    if (backtopRef.current !== null) {
      if (window.scrollY > 400) {
        backtopRef.current?.classList.add("active")
      } else {
        backtopRef.current?.classList.remove("active")
      }
    }
  })



  return (
    pageLoading ? <h1>pageLoading</h1>
      : <>

        <main>
          <article>
            <div id="progressBarContainer" >
              <div id="progressBar" ></div>
            </div>

            <section className="section hero has-bg-image" aria-label="home">
              <div className="container">
                <div className="hero-content" data-aos="fade-right" data-aos-offset="200" data-aos-duration="1000" >
                  <h1 className="h1 section-title">
                    The Best Website for students to <span className="span" data-aos="zoom-in"
                      data-aos-delay="500">Search</span> for Events.
                  </h1>
                  <p className="hero-text">
                    Hello future engineers!<br />Welcome to <b>Event Manage</b>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                  </p>

                </div>

              </div>
            </section>


            <section className="section about" id='about' aria-label="about">
              <div className="container">
                <div className="about-content">
                  <p className="section-subtitle" style={{ "color": "var(--gray-web)" }}>About Us</p>
                  <h3 className="h2 section-title" data-aos="fade-right" data-aos-duration="400">
                    A group of enthusiastic <span className="span" data-aos="zoom-in" data-aos-delay="300">Engineers keen to</span> help
                    their fellow Engineers.
                  </h3>
                  <p className="section-text" style={{ "color": "var(--gray-web)" }}>
                  Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                  
                    
                  </p>
                  <ul className="about-list" style={{ "fontSize": "1.5rem" }}>
                    <li className="about-item">
                      <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                      <span className="span" data-aos="zoom-in">Dummy Data 1</span>
                    </li>
                    <li className="about-item">
                      <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                      <span className="span" data-aos="zoom-in" data-aos-delay="300">Dummy Data 2</span>
                    </li>
                    <li className="about-item">
                      <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                      <span className="span" data-aos="zoom-in" data-aos-delay="600">Dummy Data 3</span>
                    </li>
                  </ul>
                </div>

              </div>
            </section>




      
            {/* <Team />
            <FAQ /> */}

          </article>
        </main>


        <style>
          {`
            .swiper-slide {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              backdrop-filter: blur(2.5px);
            }
            .swiper-slide-shadow-left {
              display: none;
            }
            .swiper-slide-shadow-right {
              display: none;
            }
            .swiper-pagination-bullets {
              display: none;
            }
          `}
        </style>
      </>
  )
}


export default Home