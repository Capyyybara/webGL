// // 片元着色器
// precision mediump float;
// varying vec4 v_color;
// void main() {
//     vec4 color = v_color / vec4(255.0, 255.0, 255.0, 1.0);
//     gl_FragColor = color;
// }

// 片元着色器
precision mediump float; // 设置浮点数精度为中等

// 传递给片元着色器的颜色
// js中的rgba
varying vec4 v_color;

void main(){

    vec4 color = v_color / vec4(255.0, 255.0, 255.0, 1.0);

    // 内置变量
    gl_FragColor = color;
}