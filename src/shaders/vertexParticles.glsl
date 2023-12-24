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
    gl_PointSize = 5000. * (1./ - mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}