import { useEffect, useState } from 'react';
import * as THREE from 'three';
import lines from '../assets/data/dots-1.json';
import imgMap from '../assets/data/map-1.jpg';
/*import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertexParticles.glsl';*/


function About() {
  



  return (
    <div className="about">
        <div className="centent">
      About
      <div className="home">
      <div className="header">
        <span className="name">MR. Hassan Outhami</span>
        <span className="job">Software engineer</span>
      </div>
      <div className="menu">
      <div className="navbar">
            <a href="#">Home</a> 
            <a href="#">About</a> 
            <a href="#">Services</a> 
            <a href="#">Contact</a>
        </div>
      </div>
    </div>
        </div>
    </div>
  );
}

export default About;
