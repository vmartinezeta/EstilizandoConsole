const chalk = require('chalk')

class Linea {
    constructor({numeros, orientacion}) {
        this.numeros = numeros || []
        this.orientacion = orientacion
    }

    agregar(num) {
        this.numeros.push(num)
    }

    toString() {
        return this.numeros.reduce((text, num, idx)=> {
            if (!num) return text + ""
            if (idx % 2 === 0) return `${text}${chalk.red.bold(num)}`+"\t"
            return `${text}${chalk.red.underline(num)}`+"\t"
        },"")
    }

    newInstance() {
        return new Linea({numeros:this.numeros, orientacion:this.orientacion})
    }
}

module.exports = {
    Linea
}