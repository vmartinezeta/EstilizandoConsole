
const chalk = require('chalk');

const ReguladorNumPrimo = {
    LOS_PRIMEROS_PRIMOS: "LOS PRIMEROS PRIMOS",
    LOS_PRIMOS_MENORES:"LOS PRIMOS MENORES"
}

const Orientacion = {
    HORIZONTAL : "HORIZONTAL",
    VERTICAL : "VERTICAL"
}


class GeneradorNumPrimo {
    constructor({regulador, cantidad}) {
        this.regulador = regulador
        this.cantidad = cantidad
    }

    generar() {
        if (this.regulador === ReguladorNumPrimo.LOS_PRIMEROS_PRIMOS) {
            return this.primerosPrimos()
        }
        return this.primosMenores()
    }

    primerosPrimos() {
        if (this.cantidad<=0) {
            throw new TypeError("GeneradorNumPrimo.primerosPrimos().La cantidad debe ser positivo.")
        }
        const primos = [2]
        let n = 3
        while(primos.length < this.cantidad) {
            if (this.isNumPrimo(n)) {
                primos.push(n)                
            }
            n = n + 2
        }
        return primos
    }

    isNumPrimo(num) {
        const div = Math.sqrt(num)
        for(let i = 2; i<=div; i++) {
            if(num % i === 0) return false
        }
        return true
    }

    primosMenores() {
        if (this.cantidad < 2) {
            throw new TypeError("La cantidad debe ser mayor a 1")
        }
        const primos = [2]
        let n = 3
        while(n <= this.cantidad) {
            if (this.isNumPrimo(n)) {
                primos.push(n)                
            }
            n = n + 2
        }
        return primos
    }
}


class Linea {
    constructor({numeros, orientacion}) {
        this.numeros = numeros
        this.orientacion = orientacion
    }

    getSize() {
        return this.numeros.length
    }

    reset() {
        this.numeros = []
    }

    agregar(num) {
        this.numeros.push(num)
    }

    toString() {
        return this.numeros.reduce((text, num)=>`${text}${chalk.red.bold(num)}`+"\t","")
    }

    newInstance() {
        return new Linea({numeros:this.numeros, orientacion:this.orientacion})
    }
}


class FormateadorConsola {
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
        for(let i=0; i<lista.length;i++) {
            if (linea.length === this.cantidad) {
                this.cuadricula.push(linea)
                linea = []
                linea.push(lista[i])
            } else {
                linea.push(lista[i])
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
            const l = new Linea({numeros:[], orientacion:Orientacion.HORIZONTAL})
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
            const l = new Linea({numeros:[], orientacion:Orientacion.VERTICAL})
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


// implementacion
const generador = new GeneradorNumPrimo({
    regulador: ReguladorNumPrimo.LOS_PRIMEROS_PRIMOS,
    cantidad:100
})

const lista = generador.generar()

const formateador = new FormateadorConsola({
    titulo:"Los primeros 100 primos",
    lista,
    orientacion:Orientacion.VERTICAL,
    cantidad: 10
})

formateador.formatear()