import { useEffect, useState } from 'react';
import * as THREE from 'three';
import lines from '../assets/data/dots-1.json';
import imgMap from '../assets/data/map-1.jpg';
/*import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertexParticles.glsl';*/
const vertex = `
uniform float time;
uniform sampler2D texture1; 
varying vec2 vUv;
varying float vOpacity;
varying vec3 vPosition;
attribute float opacity;
float PI = 3.14159265359;
void main(){
    vUv = uv;
    vOpacity = opacity; 
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.);
    gl_PointSize = 2000. * (1./ - mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fragment = `
uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying float vOpacity;
varying vec3 vPosition;
float PI = 3.14159265359;

void main(){  
    vec2 uv = vec2(gl_PointCoord.x, 1. - gl_PointCoord.y); 
    vec2 cUV = 2.*uv - 1.;
    vec3 origineColor = vec3(4./255., 10./255., 20./255.);
    vec4 color = vec4(1./length(cUV));
    color.rgb = min(vec3(10.), color.rgb);
    color.rgb *= origineColor*120.;
    color *= vOpacity;
    color.a = min(1., color.a)*10.;
    float disc = length(cUV);
    /*gl_FragColor = vec4(1. - disc, 0., 0., 1.)*vOpacity;
    gl_FragColor = vec4(origineColor, 1.)*vOpacity;
    gl_FragColor = vec4(vOpacity*uv.x, vOpacity*uv.y, vOpacity, 1.);*/
    gl_FragColor = vec4(color.rgb, 1.);
}
`;

function Home() {
  const [container, setContainer] = useState<HTMLElement>();
  const [geometry, setGeometry] = useState<THREE.BufferGeometry>();
  const [camera, setCamera] = useState<THREE.PerspectiveCamera>();
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [scene, setScene] = useState<THREE.Scene>();

  useEffect(() => {
    let width = window.innerWidth, height = window.innerHeight;
    let maxDots = 50;
    let maxLines = lines.length * maxDots;
    const positions = new Float32Array(maxLines * 3);
    const opacities = new Float32Array(maxLines);
    for (let i = 0; i < maxLines; i++) {
      positions.set([Math.random() * 100, Math.random() * 1000, 0], i * 3);
      opacities.set([Math.random() / 5], i);
    }
    function animation(time: any, xRendere: any, xPlan: any, xScene: any, xCamera: any) {
      if (!container || !geometry) {
        return;
      }
      xPlan.rotation.x = 0;
      xPlan.rotation.y = 0;
      xRendere.render(xScene, xCamera);
      updateDots();
    }

    function updateDots() {
      if (!container || !geometry) {
        return;
      }
      let j = 0;
      lines.forEach(line => {
        line.currentPos += line.speed;
        line.currentPos = line.currentPos % line.number;
        for (let i = 0; i < maxDots; i++) {
          let index = (line.currentPos + i) % line.number;
          const { x, y, z } = line.points[index];
          positions.set([x, y, z], j * 3);
          opacities.set([i / 500], j);
          j++;
        }
      });
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      //geometry.attributes.position.array = positions;
      geometry.attributes.position.needsUpdate = true;
      geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
      //geometry.attributes.opacity.array = opacities;
      geometry.attributes.opacity.needsUpdate = true;
    }
    if (!container || !geometry || !camera || !renderer || !scene) {
      const _container = document.getElementById("container");
      if (_container) {
        setContainer(_container);
        setGeometry(new THREE.BufferGeometry());
        setCamera(new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 100, 10000));
        setScene(new THREE.Scene());
        setRenderer(new THREE.WebGLRenderer({ antialias: true }));
      }
    } else {
      let mouse = {
        x: 0,
        y: 0
      };
      camera.position.set(0, 0, 600);
      let texture = new THREE.TextureLoader().load(imgMap);
      texture.flipY = false;
      let map1 = new THREE.Mesh(
        new THREE.PlaneGeometry(2048, 1024, 1, 1),
        new THREE.MeshBasicMaterial({
          color: 0x000044,
          map: texture
        })
      );
      let plan: any = null;

      const material = new THREE.ShaderMaterial({
        extensions: {
          derivatives: true
        },
        fragmentShader: fragment,
        vertexShader: vertex,
        uniforms: {
          //progress: { type: "f", value: 0 }
        },
        transparent: true,
        depthTest: true,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
      plan = new THREE.Points(geometry, material); 
      scene.add(plan);
      scene.add(map1)
      renderer.setSize(width, height);
      renderer.setAnimationLoop((t) => animation(t, renderer, plan, scene, camera));
      container.appendChild(renderer.domElement);
      const handleMouseMove = (event: any) => { 
        event.preventDefault()
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        const colorChangeFactor = 0.1; 
        const colorChange = new THREE.Color(
          0.5 + 0.5 * mouse.x,
          0.5 - 0.5 * mouse.y,
          0.5 + 0.5 * Math.abs(mouse.x - mouse.y)
        );
        map1.material.color.lerp(colorChange, colorChangeFactor);
      };
      console.log('add event')
      container.addEventListener('mousemove', handleMouseMove);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };

    }
  }, [container])




  return (
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
  );
}

export default Home;
