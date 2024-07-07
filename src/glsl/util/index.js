// // 创建对象 传入源码 编译
// /**
//  * 
//  * @param {WebGLRenderingContext} gl 
//  * @param {*} type 
//  * @param {*} source 
//  */
// export const createShader = function (gl, type, source) {
//     // 根据类型创建shader
//     let shader = gl.createShader(type);
//     // shader其实就是字符串,传入shader
//     gl.shaderSource(shader, source);
//     // 在使用之前编译shader
//     gl.compileShader(shader);
//     return shader;
// }

// /**
//  * 
//  * @param {WebGLRenderingContext} gl 
//  * @param {*} vertexShader 
//  * @param {*} fragmentShader 
//  */
// export const createProgram = function (gl, vertexShader, fragmentShader) {
//     let program = gl.createProgram();
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);
//     return program;
// }

// export const randomColor = function () {
//     return {
//         r: Math.random() * 255,
//         g: Math.random() * 255,
//         b: Math.random() * 255,
//         a: 1
//     }
// }
// 创建对象 传入源码 编译

export const createShader = function (gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}


export const createProgram = function (gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // debugger
    gl.linkProgram(program);
    return program;
}

export const randomColor = function() {
    return {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
        a: 1
    }
}