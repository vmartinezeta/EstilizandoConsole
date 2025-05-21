const {ReguladorNumPrimo} = require("./ReguladorNumPrimo.js")

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


module.exports = {
    GeneradorNumPrimo
}