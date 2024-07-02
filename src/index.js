import vert from './glsl//index.vert'
import frag from './glsl/index.frag'
import { createProgram, createShader, randomColor } from './glsl/util'

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#canvas')
let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

// 总的来讲一共分为四步
// 1. 先创建shader
const vertShader = createShader(gl, gl.VERTEX_SHADER, vert)
const fragShader = createShader(gl, gl.FRAGMENT_SHADER, frag)

// 2. 创建program来将shader附着到程序中
const program = createProgram(gl, vertShader, fragShader);

// 3. 使用shader
gl.linkProgram(program)
gl.useProgram(program)

// 4. 进行绘制
gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.drawArrays(gl.POINTS, 0, 1)