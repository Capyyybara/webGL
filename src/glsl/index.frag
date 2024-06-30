// 片元着色器
precision mediump float;
// 此处定义的名称需与js中获取的名称进行敌营
uniform vec4 u_color;

void main() {
    // 设置像素的填充颜色为红色.
    vec4 color = u_color / vec4(255, 255, 255, 1.0);
    gl_FragColor = color;
}