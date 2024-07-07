// 片元着色器
precision mediump float;
varying vec4 v_color;
void main() {
    vec4 color = v_color / vec4(255.0, 255.0, 255.0, 1.0);
    gl_FragColor = color;
}