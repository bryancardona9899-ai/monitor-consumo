# Monitor de Consumo Energético

Solución en JavaScript, solo utilizando Node.js para detectar la ventana consecutiva de mayor consumo promedio en un edificio.

## Contrato Computacional
- **Entrada (`lecturas`)**: Un arreglo ordenado cronológicamente de objetos que contienen `hora` (string) y `kwh` (número decimal no negativo).
- **Entrada (`k`)**: Un número entero positivo que representa el tamaño de la ventana consecutiva de medición ($1 \le k \le n$).
- **Salida esperada**: Un objeto que detalla la posición inicial y final, la hora de inicio y fin, la suma total, el promedio de consumo y el contador de operaciones de suma realizadas.

## Ejemplo Manual (Pequeño)
Supongamos un arreglo de 4 lecturas y un tamaño de ventana $k = 2$:
- Lecturas: `[{hora: "01:00", kwh: 10}, {hora: "02:00", kwh: 20}, {hora: "03:00", kwh: 15}, {hora: "04:00", kwh: 25}]`

Ventanas evaluadas:
1. Ventana 1 (`01:00 - 02:00`): Suma = $10 + 20 = 30$, Promedio = $30 / 2 = 15$
2. Ventana 2 (`02:00 - 03:00`): Suma = $20 + 15 = 35$, Promedio = $35 / 2 = 17.5$
3. Ventana 3 (`03:00 - 04:00`): Suma = $15 + 25 = 40$, Promedio = $40 / 2 = 20$ (¡Máximo promedio encontrado!)

## Instrucciones de Ejecución
Asegúrate de tener instalado [Node.js](https://nodejs.org/). Y ejecuta desde la carpeta raíz `monitor-consumo`, usa el comando:

```bash
node src/index.js