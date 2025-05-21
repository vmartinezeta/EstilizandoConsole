const {GeneradorNumPrimo} = require("./classes/GeneradorNumPrimo.js")
const {FormateadorConsole} = require("./classes/FormateadorConsole.js")
const {ReguladorNumPrimo} = require("./classes/ReguladorNumPrimo.js")
const {Orientacion} = require("./classes/Orientacion.js")

// implementacion
const generador = new GeneradorNumPrimo({
    regulador: ReguladorNumPrimo.LOS_PRIMEROS_PRIMOS,
    cantidad:100
})
const lista = generador.generar()


const formateador = new FormateadorConsole({
    titulo:"Los primeros 100 primos",
    lista,
    orientacion:Orientacion.VERTICAL,
    cantidad: 10
})
formateador.formatear()