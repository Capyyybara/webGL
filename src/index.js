// import vert from './glsl//index.vert'
// import frag from './glsl/index.frag'
// import { createProgram, createShader, randomColor } from './glsl/util'

// /**
//  * @type {HTMLCanvasElement}
//  */
// const canvas = document.querySelector('#canvas')
// let gl = canvas.getContext('webgl')

// // 总的来讲一共分为四步
// // 1. 先创建shader
// const vertShader = createShader(gl, gl.VERTEX_SHADER, vert)
// const fragShader = createShader(gl, gl.FRAGMENT_SHADER, frag)

// // 2. 创建program来将shader附着到程序中
// const program = createProgram(gl, vertShader, fragShader);
// gl.useProgram(program)


// const point = [];
// const color = []

// const a_position = gl.getAttribLocation(program, 'a_position');
// const a_screen_size = gl.getAttribLocation(program, 'a_screen_size');
// const a_color = gl.getAttribLocation(program, 'a_color')

// // 给宽高赋值
// gl.vertexAttrib2f(a_screen_size, canvas.width, canvas.height);

// /**
//  * 
//  * @param {WebGLRenderingContext} gl 
//  * @param {*} attribute 
//  * @param {*} vertexAttribPointer 
//  */
// // function createBuffer(gl, attribute, vertexAttribPointer) {
// //     let { size, type, normalize, stride, offset } = vertexAttribPointer;
// //     gl.enableVertexAttribArray(attribute);
// //     let buffer = gl.createBuffer();
// //     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// //     // 多个buffer
// //     gl.vertexAttribPointer(
// //         attribute,
// //         size,
// //         type || gl.FLOAT,
// //         normalize || false,
// //         stride || 0,
// //         offset || 0
// //     );
// //     return buffer;
// // }
// function createBuffer(gl, attribute, vertexAttribPointer) {
//     let { size, type, normalize, stride, offset } = vertexAttribPointer;
//     gl.enableVertexAttribArray(attribute);
//     let buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

//     // 多个buffer
//     gl.vertexAttribPointer(
//         attribute,
//         size,
//         type || gl.FLOAT,
//         normalize || false,
//         stride || 0,
//         offset || 0
//     );
//     return buffer;
// }



// // // 定义颜色和位置的buffer并进行绑定
// // const positionBuffer = gl.createBuffer();
// // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// // // 定义取值方式
// // gl.vertexAttrib2f(a_position, 2, gl.FLOAT, false, 0, 0)

// // const colorBuffer = gl.createBuffer();
// // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
// // gl.vertexAttrib2f(a_color, 4, gl.FLOAT, false, 0, 0);

// const positionBuffer = createBuffer(gl, a_position, {
//     size: 2,
//     type: gl.FLOAT,
//     normalize: false,
//     stride: 0,
//     offset: 0,
// })

// const colorBuffer = createBuffer(gl, a_color, {
//     size: 4,
//     type: gl.FLOAT,
//     normalize: false,
//     stride: 0,
//     offset: 0,
// })

// canvas.addEventListener('click', (e) => {
//     point.push(e.pageX, e.pageY);
//     const temp_color = randomColor();
//     color.push(temp_color.r, temp_color.g, temp_color.b, temp_color.a);
//     if (point.length > 0) {
//         gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW);

//         gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
//         if (point.length % 6 == 0) {
//             gl.clear(gl.COLOR_BUFFER_BIT);
//             gl.drawArrays(gl.TRIANGLES, 0, point.length / 2);
//         }
//     }
// })

// gl.clearColor(0.0, 0.0, 0.0, 1.0)
// gl.clear(gl.COLOR_BUFFER_BIT)

import frag from './glsl/index.frag'
import vert from './glsl/index.vert'
import { createShader, createProgram, randomColor } from './glsl/util'

var canvas = document.querySelector('#canvas');
var gl = canvas.getContext('webgl') || canvas.getContext("experimental-webgl");


// 创建顶点着色器
const vertShader = createShader(gl, gl.VERTEX_SHADER, vert);
const fragShader = createShader(gl, gl.FRAGMENT_SHADER, frag);

// debugger
//创建着色器程序
const program = createProgram(gl, vertShader, fragShader);
// 使用刚创建好的着色器程序。
gl.useProgram(program);

// let success = gl.getProgramParameter(program, gl.LINK_STATUS);
// debugger
// debugger

// 定义三个顶点  传入的canvas的x和y
const point = []
const color = []

// 读取posiotion地址
const a_position = gl.getAttribLocation(program, 'a_position');
const a_color = gl.getAttribLocation(program, 'a_color');
// 读取宽高
const a_screen_size = gl.getAttribLocation(program, 'a_screen_size');

// debugger
// 给宽高赋值
// 传静态顶点信息
gl.vertexAttrib2f(a_screen_size, canvas.width, canvas.height);


// 定义颜色和位置的buffer数据绑定
function createBuffer(gl, attribute, vertexAttribPointer) {
    let { size, type, normalize, stride, offset } = vertexAttribPointer;
    gl.enableVertexAttribArray(attribute);
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // 多个buffer
    gl.vertexAttribPointer(
        attribute,
        size,
        type || gl.FLOAT,
        normalize || false,
        stride || 0,
        offset || 0
    );
    return buffer;
}


const positionBuffer = createBuffer(gl, a_position, {
    size: 2,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0
});

const colorBuffer = createBuffer(gl, a_color, {
    size: 4,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0
});


canvas.addEventListener('click', function (e) {
    const x = e.pageX;
    const y = e.pageY;
    point.push(x, y);

    const temp_color = randomColor();
    color.push(temp_color.r, temp_color.g, temp_color.b, temp_color.a);

    if (point.length > 0) {
        // 每次要重新bindBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // 将动态改为静态
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

        if (point.length % 6 === 0) {
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, point.length / 2);
        }
    }
})


// 清空画布
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);


