var UglifyJS = require('uglify-js');
const csso = require('csso') 
const fs = require('fs-extra')
const { join } = require('path')

async function uglify(code) {
    var res = UglifyJS.minify(code)
    if (res.error) throw res.error
    else return res.code
}

function compressCSS(css){
    return csso.minify(css, {
        restructure: true
    }).css;
}

function read(filepath){
    return fs.readFile(join(__dirname, 'src', filepath), 'utf-8')
}

async function main() {
    await fs.ensureDir(join(__dirname, 'dist'))

    var indexHTML = await read('index.html')

    var logicJS = await read('logic.js')

    indexHTML = indexHTML
    .replace('<link rel="stylesheet" href="normalize.css">', `<style>${
        compressCSS(await read('normalize.css'))
    }</style>`)
        .replace('<link rel="stylesheet" href="style.css">', `<style>${
            compressCSS(await read('style.css'))
        }</style>`)
        .replace('<script src="logic.js"></script>', `<script>${await uglify(logicJS)}</script>`)

    await fs.writeFile(join(__dirname, 'dist', 'index.html'),indexHTML)
}

main();