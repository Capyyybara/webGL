import vert from './glsl//index.vert'
import frag from './glsl/index.frag'
import { createProgram, createShader, randomColor, createBuffer } from './glsl/util'

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

gl.enableVertexAttribArray(a_position)
gl.enableVertexAttribArray(a_color)

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, 24, 8)

canvas.addEventListener('click', (e) => {
    point.push(e.pageX, e.pageY);
    const temp_color = randomColor();
    point.push(temp_color.r, temp_color.g, temp_color.b, temp_color.a);
    if (point.length > 0) {
        if (point.length % 18 == 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW)

            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLES, 0, point.length / 2);
        }
    }
})

gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)