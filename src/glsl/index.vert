// // 定义浮点精度
precision mediump float;
attribute vec2 a_position;
attribute vec2 a_screen_size;
// // js传递过来的颜色
attribute vec4 a_color;
// // 给片元的颜色
varying vec4 v_color;

// void main() {
    // vec2 position = (a_position / a_screen_size) * 2.0 - 1.0;
    // position = position * vec2(1.0, -1.0);
    // gl_Position = vec4(position, 0.0, 1.0);
    // // 使用varying在顶点着色器中接收到的值会被传递到片元着色器中
    // v_color=a_color
// }

// 定义浮点精度
// precision mediump float;

// canvas xy
// attribute vec2 a_position;
// canvas 宽高
// attribute vec2 a_screen_size;

// js传递来的属性 颜色
// attribute vec4 a_color;

// 传递给片元着色器的颜色
// varying vec4 v_color;

void main() {
    // 顶点坐标
    vec2 position = (a_position / a_screen_size) * 2.0 - 1.0;
    position = position * vec2(1.0, -1.0);

    gl_Position = vec4(position, 0.0, 1.0);
    // 使用varying在顶点着色器中，接收到的值会被传递到片元着色器中
    v_color = a_color;
}