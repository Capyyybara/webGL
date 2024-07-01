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
gl.useProgram(program);

// 定义三个顶点
const point = [1.0, 0.5, 0.2, 0.3, 0.6, 0.8]
// 读取position地址
const a_position = gl.getAttribLocation(program, 'a_position');

// 转多条数据
// 创建缓冲区
const buffer = gl.createBuffer();
// 绑定缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// 将数据写入缓冲区
// webgl浮点数占用4个字节,32位
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW)

// 将缓冲区数据和a_position关联
gl.enableVertexAttribArray(a_position);

const size = 2; //每次读取两个数据
const type = gl.FLOAT; // 数据类型
const normalize = false; // 是否归一化
const stride = 0; // 间隔
const offset = 0; // 偏移量

gl.vertexAttribPointer(a_position, size, type, normalize, stride, offset)

// 清空画布
gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

// 绘制
gl.drawArrays(gl.TRIANGLES, 0, 3)