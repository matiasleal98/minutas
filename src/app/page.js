const { readFile } = require("fs/promises");
import Tabla from "./Tabla";

export default async function Home() {
  const csv = await fetch(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSped92cqMSKc_PZwCIJF7Kw3g-5X3hzac2gUTsga4lTjiw_NpT9SWiNt5oXCXTXpqS4DoezN3EFDLX/pub?output=csv`,
    { cache: "no-store" }
  );

  const data = await csv.text();

  const object = (obj) => {
    return {
      ingrediente: obj[0],
      medida: obj[1],
      tb: obj[2],
      tn: obj[3],
      bb: obj[4],
      bn: obj[5],
    };
  };

  let _minutas = data
    .toString()
    .split("NOMBRE:,")
    .filter((minuta) => minuta.length > 1)
    .map((receta) => {
      let _receta = receta.split(/\n/);
      return {
        nombre: _receta[0].slice(0, -5),
        receta: _receta
          .slice(1)
          .map((ingrediente) => object(ingrediente.slice(0, -2).split(","))),
      };
    });
  let minutas = data
    .toString()
    .split("NOMBRE:,")
    .filter((minuta) => minuta.length > 1)
    .map((receta) => {
      let _receta = receta.split(/\n/);
      return {
        nombre: _receta[0].slice(0, -5),
        receta: _receta
          .slice(1)
          .map((ingrediente) => ingrediente.slice(0, -1))
          .filter((ing) => ing.length > 5)
          .map((ing) => object(ing.split(","))),
      };
    });

  return (
    <div className="card flex justify-content-center">
      <Tabla minutas={minutas} />
    </div>
  );
}
