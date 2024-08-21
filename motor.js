function calculoMotor(tipoNomina, fechaPrimerEmpleo, genero) {

    const lowerNomina = tipoNomina.toLowerCase();
  // 1. Calcular los meses desde el primer empleo
  const fechaInicial = new Date(fechaPrimerEmpleo);
  const fechaActual = new Date();
  
  let anios = fechaActual.getFullYear() - fechaInicial.getFullYear();
  let meses = fechaActual.getMonth() - fechaInicial.getMonth();

  if (meses < 0) {
    anios--;
    meses += 12;
  }

  const totalMeses = anios * 12 + meses;

  // Rangos de crédito según género
  const creditoMinimoFemenino = [
    { rango: "24", a: 800, b: 800, c: 200, d: 500 },
    { rango: "25", a: 800, b: 700, c: 900, d: 1000 },
    { rango: "26", a: 800, b: 100, c: 700, d: 600 },
    { rango: "27", a: 600, b: 600, c: 800, d: 400 },
    { rango: "28", a: 200, b: 700, c: 100, d: 700 },
  ];

  const creditoMaximoFemenino = [
    { rango: "24", a: 4000, b: 4700, c: 4600, d: 5000 },
    { rango: "25", a: 4200, b: 4200, c: 4900, d: 4900 },
    { rango: "26", a: 4100, b: 4500, c: 4600, d: 4700 },
    { rango: "27", a: 4200, b: 4300, c: 4700, d: 5000 },
    { rango: "28", a: 4500, b: 4400, c: 4000, d: 4300 },
  ];

  const creditoMinimoMasculino = [
    { rango: "26", a: 100, b: 1000, c: 400, d: 400 },
    { rango: "27", a: 400, b: 600, c: 200, d: 300 },
    { rango: "28", a: 900, b: 1000, c: 200, d: 500 },
    { rango: "29", a: 100, b: 1000, c: 1000, d: 900 },
    { rango: "30", a: 600, b: 1000, c: 600, d: 1000 },
  ];

  const creditoMaximoMasculino = [
    { rango: "26", a: 4900, b: 4700, c: 5000, d: 4400 },
    { rango: "27", a: 4700, b: 4400, c: 4700, d: 4700 },
    { rango: "28", a: 4600, b: 5000, c: 5000, d: 4300 },
    { rango: "29", a: 4600, b: 4400, c: 4200, d: 4900 },
    { rango: "30", a: 4500, b: 4900, c: 4600, d: 4300 },
  ];

  // Buscar el rango adecuado
  const buscarRango = (meses, tipo, nomina) => {
    // Devuelve el último rango si no se encuentra uno exacto
    const result = tipo.find(item => parseInt(item.rango) <= meses);
    console.log(result)
    console.log('nomina => ',nomina)
    console.log('valor nomina =>, ', result[nomina])
    return result[nomina]
  };

  let rangoMinimo, rangoMaximo;

  // Rangos según el tipo de nómina y género
  switch (lowerNomina) {

    case 'a':
      if (genero === "f") {

        rangoMinimo = buscarRango(totalMeses, creditoMinimoFemenino, lowerNomina);
        rangoMaximo = buscarRango(totalMeses, creditoMaximoFemenino, lowerNomina);
      } else if (genero === "m") {
        rangoMinimo = buscarRango(totalMeses, creditoMinimoMasculino, lowerNomina);
        rangoMaximo = buscarRango(totalMeses, creditoMaximoMasculino, lowerNomina);
      }
      break;
    case 'b':
       
      if (genero === "f") {
        rangoMinimo = buscarRango(totalMeses, creditoMinimoFemenino, lowerNomina);
        rangoMaximo = buscarRango(totalMeses, creditoMaximoFemenino, lowerNomina);
      } else if (genero === "m") {
        rangoMinimo = buscarRango(totalMeses, creditoMinimoMasculino, lowerNomina);
        rangoMaximo = buscarRango(totalMeses, creditoMaximoMasculino, lowerNomina);
      }
      break;
    case 'c':
      if (genero === "f") {
     
        rangoMinimo = buscarRango(totalMeses, creditoMinimoFemenino, lowerNomina);
        rangoMaximo = buscarRango(totalMeses, creditoMaximoFemenino, lowerNomina);
      } else if (genero === "m") {
        rangoMinimo = buscarRango(totalMeses, creditoMinimoMasculino, lowerNomina);
        rangoMaximo = buscarRango(totalMeses, creditoMaximoMasculino, lowerNomina);
      }
      break;
    case 'd':
      if (genero === "f") {
        rangoMinimo = buscarRango(totalMeses, creditoMinimoFemenino, lowerNomina);
        rangoMaximo = buscarRango(totalMeses, creditoMaximoFemenino, lowerNomina);
      } else if (genero === "m") {
        rangoMinimo = buscarRango(totalMeses, creditoMinimoMasculino, lowerNomina);
        rangoMaximo = buscarRango(totalMeses, creditoMaximoMasculino, lowerNomina);
      }
      break;
    default:
      return { montoMinimo: null, montoMaximo: null, lineaoptima: null };
  }

  // Montos
  const montoMinimoCredito = rangoMinimo
  const montoMaximoCredito = rangoMaximo
   

  // Calcular p1 y p2
  const p1 = montoMinimoCredito + Math.sqrt(montoMaximoCredito - montoMinimoCredito);
  const p2 = montoMinimoCredito + 0.0175 * (montoMaximoCredito - montoMinimoCredito);

  //  la línea óptima de crédito
  const lineaoptima = Math.max(p1, p2);

  // objeto con los resultados
  return {
    montoMinimo: montoMinimoCredito,
    montoMaximo: montoMaximoCredito,
    lineaoptima,
  };
}

// Ejemplos de uso
const resultado = calculoMotor("A", new Date("2022-06-12"), "f");
const resultado2 = calculoMotor("B", new Date("1993-12-30"), "f");
const resultado3 = calculoMotor("C", new Date("2020-09-19"), "m");
const resultado4 = calculoMotor("D", new Date("2019-01-15"), "m");

console.log(resultado);
console.log(resultado2);
console.log(resultado3);
console.log(resultado4);
