// Analizador - Paso 3

/**
 * Valida las entradas del sistema.
 */
function validarEntrada(lecturas, k) {
    if (!Array.isArray(lecturas)) {
        return { valido: "invalido", mensaje: "El parámetro de lecturas no es un arreglo." };
    }
    if (lecturas.length === 0) {
        return { valido: "invalido", mensaje: "El arreglo de lecturas está vacío." };
    }
    if (typeof k !== "number" || isNaN(k) || k < 1 || k > lecturas.length) {
        return { valido: "invalido", mensaje: `El tamaño de ventana k (${k}) está fuera de rango (1 a ${lecturas.length}).` };
    }

    for (let i = 0; i < lecturas.length; i++) {
        const item = lecturas[i];
        if (!item || typeof item !== "object" || !("hora" in item) || !("kwh" in item)) {
            return { valido: "invalido", mensaje: `Lectura incompleta o mal formada en el índice ${i}.` };
        }
        if (typeof item.kwh !== "number" || isNaN(item.kwh) || item.kwh < 0) {
            return { valido: "invalido", mensaje: `Valor kwh inválido o negativo (${item.kwh}) en el índice ${i}.` };
        }
    }

    return { valido: "valido", mensaje: "Entrada correcta." };
}

/**
 * Estrategia 1: Directa (revisa cada ventana y suma elemento por elemento)
 */
function estrategiaDirecta(lecturas, k) {
    let mejorInicio = 0;
    let mejorFin = k - 1;
    let maxPromedio = -1;
    let mejorSuma = 0;
    let operacionesSuma = 0;

    for (let i = 0; i <= lecturas.length - k; i++) {
        let sumaActual = 0;
        for (let j = 0; j < k; j++) {
            sumaActual += lecturas[i + j].kwh;
            operacionesSuma++;
        }
        let promedioActual = sumaActual / k;

        if (promedioActual > maxPromedio) {
            maxPromedio = promedioActual;
            mejorSuma = sumaActual;
            mejorInicio = i;
            mejorFin = i + k - 1;
        }
    }

    return {
        estrategia: "Directa",
        inicio: mejorInicio,
        fin: mejorFin,
        horaInicio: lecturas[mejorInicio].hora,
        horaFin: lecturas[mejorFin].hora,
        suma: mejorSuma,
        promedio: maxPromedio,
        operaciones: operacionesSuma
    };
}

/**
 * Estrategia 2: Optimizada (Ventana Deslizante).
 */
function estrategiaDeslizante(lecturas, k) {
    let mejorInicio = 0;
    let mejorFin = k - 1;
    let operacionesSuma = 0;

    let sumaActual = 0;
    for (let j = 0; j < k; j++) {
        sumaActual += lecturas[j].kwh;
        operacionesSuma++;
    }

    let maxSuma = sumaActual;
    let maxPromedio = sumaActual / k;

    for (let i = 1; i <= lecturas.length - k; i++) {
        sumaActual = sumaActual - lecturas[i - 1].kwh + lecturas[i + k - 1].kwh;
        operacionesSuma += 2; 

        let promedioActual = sumaActual / k;
        if (promedioActual > maxPromedio) {
            maxPromedio = promedioActual;
            maxSuma = sumaActual;
            mejorInicio = i;
            mejorFin = i + k - 1;
        }
    }

    return {
        estrategia: "Ventana Deslizante",
        inicio: mejorInicio,
        fin: mejorFin,
        horaInicio: lecturas[mejorInicio].hora,
        horaFin: lecturas[mejorFin].hora,
        suma: maxSuma,
        promedio: maxPromedio,
        operaciones: operacionesSuma
    };
}

/**
 * Función Integradora
 */
function analizarConsumo(lecturas, k) {
    const validacion = validarEntrada(lecturas, k);
    if (validacion.valido === "invalido") {
        return { estado: "invalido", mensaje: validacion.mensaje };
    }

    const resultadoDirecto = estrategiaDirecta(lecturas, k);
    const resultadoDeslizante = estrategiaDeslizante(lecturas, k);

    const promediosIguales = Number(resultadoDirecto.promedio.toFixed(4)) === Number(resultadoDeslizante.promedio.toFixed(4));
    const mismaVentana = resultadoDirecto.inicio === resultadoDeslizante.inicio && resultadoDirecto.fin === resultadoDeslizante.fin;

    return {
        estado: "valido",
        resultadoDirecto,
        resultadoDeslizante,
        coinciden: promediosIguales && mismaVentana
    };
}

module.exports = { validarEntrada, estrategiaDirecta, estrategiaDeslizante, analizarConsumo };