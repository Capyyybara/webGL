import vert from './glsl//index.vert'
import frag from './glsl/index.frag'
import { createProgram, createShader, randomColor } from './glsl/util'

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#canvas')
let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

// 创建顶点着色器
const vertShader = createShader(gl, gl.VERTEX_SHADER, vert)
// 创建片元着色器
const fragShader = createShader(gl, gl.FRAGMENT_SHADER, frag)

// 创建着色器程序对象
// 创建对象
const program = createProgram(gl, vertShader, fragShader);
// 使用刚刚创建好的着色器程序

if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compile failed:', gl.getShaderInfoLog(vertShader));
    // 处理错误...  
}

if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    console.error('Fragment shader compile failed:', gl.getShaderInfoLog(fragShader));
    // 处理错误...  
}
gl.useProgram(program)

// 找到变量提供的地址
// 顶点信息用attribute
const a_position = gl.getAttribLocation(program, 'a_position');
const a_screen_size = gl.getAttribLocation(program, 'a_screen_size');
// 颜色信息用uniform
const u_color = gl.getUniformLocation(program, 'u_color');

// 赋值canvas的宽高信息
gl.vertexAttrib2f(a_screen_size, canvas.width, canvas.height)


const point = []
canvas.addEventListener('click', (e) => {
    const x = e.clientX
    const y = e.clientY
    const color = randomColor();
    point.push({
        x,
        y,
        color
    })
    // 渲染
    // 设置清空画布颜色为黑色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 用上一步设置的清空画布
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制点
    for (let i = 0; i < point.length; i++) {
        const color = point[i].color;
        // 设置点位
        gl.vertexAttrib2f(a_position, point[i].x, point[i].y);
        // 设置颜色
        gl.uniform4f(u_color, color.r, color.g, color.b, color.a)
        // 绘制点
        gl.drawArrays(gl.POINTS, 0, 1)
    }
})


// 绘制
// 顶点数据
gl.clearColor(0.0, 0.0, 0.0, 1.0)

// 传入上一次的颜色
gl.clear(gl.COLOR_BUFFER_BIT)
// 绘制
// 参数1:绘制类型
// 参数2:从哪个点开始绘制
// 参数3:绘制数量
// gl.drawArrays(gl.POINTS, 0, 1)