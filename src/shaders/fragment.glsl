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