var UglifyJS = require('uglify-js');
const csso = require('csso') 
const fs = require('fs-extra')
const { join } = require('path')

async function uglify(code) {
    const res = UglifyJS.minify(code)
    if (res.error) throw res.error
    else return res.code
}

async function main() {
    await fs.ensureDir(join(__dirname, 'dist'))

    let indexHTML = await fs.readFile(join(__dirname, 'src', 'index.html'), 'utf-8')

    const logicJS = await fs.readFile(join(__dirname, 'src', 'logic.js'), 'utf-8')
    const styleCSS = await fs.readFile(join(__dirname, 'src', 'style.css'), 'utf-8')

    const compressedCSS = csso.minify(styleCSS, {
        restructure: true
    }).css;

    indexHTML = indexHTML
        .replace('<link rel="stylesheet" href="style.css">', `<style>${compressedCSS}</style>`)
        .replace('<script src="logic.js"></script>', `<script>${await uglify(logicJS)}</script>`)

    await fs.writeFile(join(__dirname, 'dist', 'index.html'),indexHTML)
}

main();