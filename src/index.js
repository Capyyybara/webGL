import vert from './glsl//index.vert'
import frag from './glsl/index.frag'
import { createProgram, createShader, randomColor, createBuffer } from './util'
import logo from "../public/微信图片_20240707090510.jpg"

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

let positions = [
    -0.5, -0.5, 0.5, 1, 0, 0, 1,
    0.5, -0.5, 0.5, 1, 0, 0, 1,
    0.5, 0.5, 0.5, 1, 0, 0, 1,
    -0.5, 0.5, 0.5, 1, 0, 0, 1,

    -0.5, 0.5, 0.5, 0, 1, 0, 1,
    -0.5, 0.5, -0.5, 0, 1, 0, 1,
    -0.5, -0.5, -0.5, 0, 1, 0, 1,
    -0.5, -0.5, 0.5, 0, 1, 0, 1,

    0.5, 0.5, 0.5, 0, 0, 1, 1,
    0.5, -0.5, 0.5, 0, 0, 1, 1,
    0.5, -0.5, -0.5, 0, 0, 1, 1,
    0.5, 0.5, -0.5, 0, 0, 1, 1,

    0.5, 0.5, -0.5, 1, 0, 1, 1,
    0.5, -0.5, -0.5, 1, 0, 1, 1,
    -0.5, -0.5, -0.5, 1, 0, 1, 1,
    -0.5, 0.5, -0.5, 1, 0, 1, 1,

    -0.5, 0.5, 0.5, 1, 1, 0, 1,
    0.5, 0.5, 0.5, 1, 1, 0, 1,
    0.5, 0.5, -0.5, 1, 1, 0, 1,
    -0.5, 0.5, -0.5, 1, 1, 0, 1,

    -0.5, -0.5, 0.5, 0, 1, 1, 1,
    -0.5, -0.5, -0.5, 0, 1, 1, 1,
    0.5, -0.5, -0.5, 0, 1, 1, 1,
    0.5, -0.5, 0.5, 0, 1, 1, 1,
]

let indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]
let color = randomColor();
const a_position = gl.getAttribLocation(program, 'a_position')
const a_color = gl.getAttribLocation(program, 'a_color')
const u_matrix = gl.getUniformLocation(program, 'u_matrix')


gl.enableVertexAttribArray(a_position)
gl.enableVertexAttribArray(a_color)

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 28, 0)
gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, 28, 12)

// position长度为24
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

// 需要36个顶点 , 使用索引
const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

// 矩阵变换
var aspect = canvas.width / canvas.height;
//计算正交投影矩阵
var projectionMatrix = matrix.ortho(-aspect * 4, aspect * 4, -4, 4, 100, -100);
var dstMatrix = matrix.identity();

// matrix.multiply(dstMatrix, matrix.rotationX(0, 0), dstMatrix);
matrix.multiply(projectionMatrix, dstMatrix, dstMatrix);
gl.uniformMatrix4fv(u_matrix, false, dstMatrix);

gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)