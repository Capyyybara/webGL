import vert from './glsl//index.vert'
import frag from './glsl/index.frag'
import { createProgram, createShader, randomColor,createBuffer } from './glsl/util'

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#canvas')
let gl = canvas.getContext('webgl')

// 总的来讲一共分为四步
// 1. 先创建shader
const vertShader = createShader(gl, gl.VERTEX_SHADER, vert)
const fragShader = createShader(gl, gl.FRAGMENT_SHADER, frag)

// 2. 创建program来将shader附着到程序中
const program = createProgram(gl, vertShader, fragShader);
gl.useProgram(program)


const point = [];
const color = []

const a_position = gl.getAttribLocation(program, 'a_position');
const a_color = gl.getAttribLocation(program, 'a_color')
const a_screen_size = gl.getAttribLocation(program, 'a_screen_size');

// 给宽高赋值
gl.vertexAttrib2f(a_screen_size, canvas.width, canvas.height);

const positionBuffer = createBuffer(gl, a_position, {
    size: 2,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0,
})

const colorBuffer = createBuffer(gl, a_color, {
    size: 4,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0,
})

canvas.addEventListener('click', (e) => {
    point.push(e.pageX, e.pageY);
    const temp_color = randomColor();
    color.push(temp_color.r, temp_color.g, temp_color.b, temp_color.a);
    if (point.length > 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
        if (point.length % 6 == 0) {
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, point.length / 2);
        }
    }
})

gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)