import Tabla from "./Tabla";

export default async function Home() {
  const csv = await fetch(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vTVqnwTfsWXd-0X1m-OprctJcyhZhLz5H3jDkVZkESb1UegvjjtWZ20OsjqBQNvbALvYRm_T2H7BVsi/pub?output=csv`,
    { cache: "no-store" }
  );

  const data = await csv.text();

  let minutas = [];
  let _data = data.split("\n");

  _data.forEach((x) => {
    let receta = x.split(",");
    if (!minutas.includes(receta[0])) minutas.push(receta[0]);
  });

  return (
    <>
      <div className="card flex justify-content-center">
        <Tabla recetas={_data} minutas={minutas} />
      </div>
    </>
  );
}
