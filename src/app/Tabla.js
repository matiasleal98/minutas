"use client";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";

function Tabla({ recetas, minutas }) {
  const [minuta, setMinuta] = useState();
  const [transicion, setTransicion] = useState(16);
  const [basica, setBasica] = useState(87);
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
          tb: obj[3],
          tn: obj[4],
          bb: obj[5],
          bn: obj[6],
        });
      }
    });

    setIngredientes(ing);
  };

  var resultado = function (num) {
    return Math.round(num * 100) / 100;
  };

  const tb = ({ tb }) => {
    return tb != 0 ? resultado(Number(transicion * tb)) : "";
  };
  const tn = ({ tn }) => {
    return tn != 0 ? resultado(Number(transicion * tn)) : "";
  };
  const bb = ({ bb }) => {
    return bb != 0 ? resultado(Number(basica * bb)) : "";
  };
  const bn = ({ bn }) => {
    return bn != 0 ? resultado(Number(basica * bn)) : "";
  };

  const totaln = ({ tn, bn }) => {
    if ((tn == 0) & (bn == 0)) return "";
    return resultado(Number(transicion * tn) + Number(basica * bn));
  };

  const totalb = ({ tb, bb }) => {
    if ((tb == 0) & (bb == 0)) return "";
    return resultado(Number(transicion * tb) + Number(basica * bb));
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
        Transición :
        <InputNumber
          value={transicion}
          onChange={(e) => setTransicion(e.value)}
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
            header="Transición 1 ración bruto"
            field="tb"
            style={{ backgroundColor: "#8FBC8F" }}
          ></Column>
          <Column
            header="Transición 1 ración neto"
            field="tn"
            style={{ backgroundColor: "#8FBC8F" }}
          ></Column>
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
            header="Transición Bruto"
            body={tb}
            style={{ backgroundColor: "#8FBC8F" }}
          ></Column>
          <Column
            header="Transición Neto"
            body={tn}
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
