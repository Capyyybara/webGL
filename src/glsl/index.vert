// 定点着色器
// 接受两个js传过来的变量

// 定义浮点精度
precision mediump float;

// 此处定义的名称需与js中获取的名称进行敌营
// 接收canvas的宽高
// a_开头 js传过来的数据
attribute vec2 a_position;
// 接收canvas的宽高
attribute vec2 a_screen_size;

void main() {
    vec2 position = a_position / a_screen_size * 2.0 - 1.0;
    // canvas和webgl的坐标系 , y是相反的
    position = position * vec2(1.0, -1.0);
    // 四维向量
    // 原点 , 在opengl中 , 只有浮点类型
    gl_Position = vec4(position, 0.0, 1.0);
    // 点的大小
    gl_PointSize = 10.0;
}