// 创建对象 传入源码 编译
/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {*} type 
 * @param {*} source 
 */
export const createShader = function (gl, type, source) {
    // 根据类型创建shader
    let shader = gl.createShader(type);
    // shader其实就是字符串,传入shader
    gl.shaderSource(shader, source);
    // 在使用之前编译shader
    gl.compileShader(shader);
    return shader;
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {*} vertexShader 
 * @param {*} fragmentShader 
 */
export const createProgram = function (gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
}

export const randomColor = function () {
    return {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
        a: 1
    }
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {*} attribute 
 * @param {*} vertexAttribPointer 
 */
export function createBuffer(gl, attribute, vertexAttribPointer) {
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