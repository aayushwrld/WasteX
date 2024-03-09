import React from 'react';
import aboutPic from '../assets/aboutpic.png'
import { FaRocket } from "react-icons/fa";
import { FaScrewdriverWrench } from "react-icons/fa6";


function About() {
  return (
    <>
    <div className='about-parent'>
      <div className="about-part-1 flex">
      <div className="about-text">
      <div className="about-text2">About Us</div>
    Welcome to WasteX, where we're passionate about revolutionizing waste management for a cleaner, greener world. Our journey began with a simple yet profound realization: improper waste disposal not only harms the environment but also jeopardizes the well-being of communities worldwide.
      </div>
      <img src={aboutPic} alt="" />
      </div>
<div className="about-part-2 flex">
  <div className="about-card-1">
  <FaRocket /> 
<br />

  Our Mission
<br />
At WasteX, our mission is clear: to tackle the critical issue of improper waste disposal head-on. Through a combination of innovative solutions, community engagement, and advocacy, we're committed to transforming neighborhoods and fostering a culture of sustainability.
  </div>

<div className="about-card-2">
<FaScrewdriverWrench />
<br />

What Drives Us?
<br/>
We believe in the power of education, awareness, and behavioral change. By empowering individuals with the knowledge and tools they need to make a positive impact, we're creating a ripple effect that extends far beyond our digital platform.
</div>
</div>

    </div>
    </>
  )
}

export default About