const { readFile } = require("fs/promises");
import Tabla from "./Tabla";

export default async function Home() {
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

  const csv = await fetch(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSped92cqMSKc_PZwCIJF7Kw3g-5X3hzac2gUTsga4lTjiw_NpT9SWiNt5oXCXTXpqS4DoezN3EFDLX/pub?output=csv`,
    { cache: "no-store" }
  );

  const data = await csv.text();

  let minutas = [];

  let _data = data.split("NOMBRE:").filter((minuta) => minuta.length > 5);

  _data.forEach((receta) => {
    let nombre = receta.split(/\n/)[0].slice(1, -5);
    let ingredientes = receta
      .split(/\n/)
      .slice(1)
      .filter((ing) => ing.length > 5)
      .map((ing) => object(ing.split(",")));

    minutas.push({ nombre, ingredientes });
  });

  console.log(minutas);

  return (
    <>
      <div className="card flex justify-content-center">
        <Tabla minutas={minutas} />
      </div>
    </>
  );
}
