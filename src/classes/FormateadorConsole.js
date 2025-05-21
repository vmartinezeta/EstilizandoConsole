const chalk = require('chalk')
const {Orientacion} = require("./Orientacion.js")
const {Linea} = require("./Linea.js")

class FormateadorConsole {
    constructor({
        titulo,
        lista,
        orientacion,
        cantidad
    }) {
        this.titulo = titulo
        this.lista = lista
        this.orientacion = orientacion
        this.cantidad = cantidad
        this.cuadricular()
    }

    cuadricular() {
        this.cuadricula = []
        let linea = []
        for(let i=0; i<this.lista.length;i++) {
            if (linea.length === this.cantidad) {
                this.cuadricula.push(linea)
                linea = []
                linea.push(this.lista[i])
            } else {
                linea.push(this.lista[i])
            }
        }
        this.cuadricula.push(linea)
    }

    toLineaArray() {
        if (this.orientacion === Orientacion.HORIZONTAL) {
            return this.horizontal()
        }
        return this.vertical()
    }

    horizontal() {
        const lineas = []
        for(let i=0; i<this.cuadricula.length;i++) {
            const l = new Linea({orientacion:Orientacion.HORIZONTAL})
            for(let j=0; j<this.cuadricula[0].length;j++) {
                l.agregar(this.cuadricula[i][j])
            }
            lineas.push(l)
        }
        return lineas
    }

    vertical () {
        const lineas = []
        for(let i=0; i<this.cuadricula[0].length;i++) {
            const l = new Linea({orientacion:Orientacion.VERTICAL})
            for(let j=0; j<this.cuadricula.length;j++) {
                l.agregar(this.cuadricula[j][i])
            }
            lineas.push(l)
        }

        return lineas
    }

    formatear() {
        console.log(chalk.green.bold(this.titulo))
        for(const l of this.toLineaArray()) {
            console.log(l.toString())
        }
    }
}


module.exports = {
    FormateadorConsole
}