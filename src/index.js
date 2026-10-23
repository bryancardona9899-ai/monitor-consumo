// index - Paso 8
const { lecturasPrincipales } = require('./datos');
const { analizarConsumo } = require('./analizador');

function ejecutarPruebas() {
    console.log("=== TAREA 2: MONITOR DE CONSUMO ENERGÉTICO ===\n");

    const kPrincipal = 3;
    console.log(`--- CASO PRINCIPAL (k = ${kPrincipal}) ---`);
    const resPrincipal = analizarConsumo(lecturasPrincipales, kPrincipal);
    
    if (resPrincipal.estado === "valido") {
        console.log("Validación: Correcta");
        console.log("Mejor Ventana (Directa):", resPrincipal.resultadoDirecto);
        console.log("Mejor Ventana (Deslizante):", resPrincipal.resultadoDeslizante);
        console.log("¿Los resultados coinciden?", resPrincipal.coinciden ? "SÍ" : "NO");
    } else {
        console.log("Error:", resPrincipal.mensaje);
    }

    console.log("\n--- VARIACIÓN 1: k = 1 ---");
    const resK1 = analizarConsumo(lecturasPrincipales, 1);
    console.log(`Promedio más alto con k=1:`, resK1.estado === "valido" ? resK1.resultadoDeslizante.promedio : resK1.mensaje);

    console.log("\n--- VARIACIÓN 2: k = n (tamaño total del arreglo) ---");
    const resKn = analizarConsumo(lecturasPrincipales, lecturasPrincipales.length);
    console.log(`Promedio con k=n:`, resKn.estado === "valido" ? resKn.resultadoDeslizante.promedio : resKn.mensaje);

    console.log("\n--- VARIACIÓN 3: Valores Iguales ---");
    const lecturasIguales = [
        { hora: "01:00", kwh: 10 },
        { hora: "02:00", kwh: 10 },
        { hora: "03:00", kwh: 10 },
        { hora: "04:00", kwh: 10 }
    ];
    const resIguales = analizarConsumo(lecturasIguales, 2);
    console.log(`Resultado con valores iguales:`, resIguales.estado === "valido" ? `Todas las ventanas tienen promedio ${resIguales.resultadoDeslizante.promedio}` : resIguales.mensaje);

    console.log("\n--- VARIACIÓN 4: Entrada Inválida (kwh negativo o arreglo vacío) ---");
    const lecturasInvalidas = [
        { hora: "01:00", kwh: 15 },
        { hora: "02:00", kwh: -5 }
    ];
    const resInvalido = analizarConsumo(lecturasInvalidas, 2);
    console.log(`Mensaje controlado obtenido:`, resInvalido.mensaje);
}

ejecutarPruebas();