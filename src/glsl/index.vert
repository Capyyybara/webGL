precision mediump float;
//  x,y,z
attribute vec3 a_position;
// js定义的颜色
attribute vec4 a_color;
// 传递给片元着色器的颜色
varying vec4 v_color;

uniform mat4 u_matrix;
void main() {
        gl_Position = u_matrix * vec4(a_position, 1.0);
        v_color = a_color;
        // gl_PointSize = 5.0;
}