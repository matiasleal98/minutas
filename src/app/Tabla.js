"use client";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";

function Tabla({ recetas, minutas }) {
  const [minuta, setMinuta] = useState();
  const [basica, setBasica] = useState(28);
  const [media, setMedia] = useState(51);
  const [ingredientes, setIngredientes] = useState();

  const getIngredientes = (receta) => {
    var ing = [];
    setMinuta(receta);

    recetas.forEach((r) => {
      if (r.startsWith(receta)) {
        let obj = r.split(",");
        ing.push({
          ingrediente: obj[1],
          medida: obj[2],
          bb: obj[3],
          bn: obj[4],
          mb: obj[5],
          mn: obj[6],
        });
      }
    });

    setIngredientes(ing);
  };

  var resultado = function (num) {
    return Math.round(num * 100) / 100;
  };

  const bb = ({ bb }) => {
    return bb != 0 ? resultado(Number(basica * bb)) : "";
  };
  const bn = ({ bn }) => {
    return bn != 0 ? resultado(Number(basica * bn)) : "";
  };
  const mb = ({ mb }) => {
    return mb != 0 ? resultado(Number(media * mb)) : "";
  };
  const mn = ({ mn }) => {
    return mn != 0 ? resultado(Number(media * mn)) : "";
  };

  const totaln = ({ bn, mn }) => {
    if ((bn == 0) & (mn == 0)) return "";
    return resultado(Number(basica * bn) + Number(media * mn));
  };

  const totalb = ({ bb, mb }) => {
    if ((bb == 0) & (mb == 0)) return "";
    return resultado(Number(basica * bb) + Number(media * mb));
  };

  return (
    <div>
      <div>
        <Dropdown
          value={minuta}
          onChange={(e) => getIngredientes(e.value)}
          options={minutas}
          filter
          className="h-[300px]"
        />
        Media :
        <InputNumber
          value={media}
          onChange={(e) => setMedia(e.value)}
          useGrouping={false}
        />
        Básica :
        <InputNumber
          value={basica}
          onChange={(e) => setBasica(e.value)}
          useGrouping={false}
        />
      </div>

      {ingredientes && (
        <DataTable
          value={ingredientes}
          tableStyle={{ minWidth: "50rem" }}
          showGridlines
        >
          <Column header="Ingrediente" field="ingrediente"></Column>
          <Column header="Medida" field="medida"></Column>
          <Column
            header="Básica 1 ración bruto"
            field="bb"
            style={{ backgroundColor: "#E9967A" }}
          ></Column>
          <Column
            header="Básica 1 ración neto"
            field="bn"
            style={{ backgroundColor: "#E9967A" }}
          ></Column>
          <Column
            header="Media 1 ración bruto"
            field="mb"
            style={{ backgroundColor: "#8FBC8F" }}
          ></Column>
          <Column
            header="Media 1 ración neto"
            field="mn"
            style={{ backgroundColor: "#8FBC8F" }}
          ></Column>
          <Column
            header="Básica Bruto"
            body={bb}
            style={{ backgroundColor: "#E9967A" }}
          ></Column>
          <Column
            header="Básica Neto"
            body={bn}
            style={{ backgroundColor: "#E9967A" }}
          ></Column>
          <Column
            header="Media Bruto"
            body={mb}
            style={{ backgroundColor: "#8FBC8F" }}
          ></Column>
          <Column
            header="Media Neto"
            body={mn}
            style={{ backgroundColor: "#8FBC8F" }}
          ></Column>
          <Column
            header="Total Bruto"
            body={totalb}
            style={{ backgroundColor: "#ADD8E6" }}
          ></Column>
          <Column
            header="Total Neto"
            body={totaln}
            style={{ backgroundColor: "#1E90FF" }}
          ></Column>
        </DataTable>
      )}
    </div>
  );
}

export default Tabla;
