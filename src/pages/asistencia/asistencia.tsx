import { useEffect, useState } from "react";
import "./asistenciaStyle.css";
import Llamadas from "../../assets/img/img-asistencia/llamadas.png";
import type { IAsistencia } from "../../models/asistencia.model";
import { useConections } from "../../context/conexionesprovider";
import AsistenciaLayout from '@/layouts/Asistencia/asistenciaLayout';
import TableAsistencia from "@/Componentes/Table/TableAsistencia";

// export default function () {
//   const { ubicaciones, getUbicaciones } = useConections();
//   useEffect(() => {
//     getUbicaciones();
//   }, [getUbicaciones, ubicaciones]);

export default function Asistencia() {
  const { asistencia, fAsistencia } = useConections()

  const itemsPerPage = 5;
  const [itemsShows, setItemsShows] = useState<IAsistencia[]>([]);
  let page = 0;
  const handleSetPage = (pageNumber: number) => {
    const itemsToShow = asistencia.slice(pageNumber, itemsPerPage);
    console.log(itemsToShow);
    setItemsShows(itemsToShow);
    page = pageNumber;
  };

  useEffect(() => {
    fAsistencia();
    handleSetPage(0);
  }, [fAsistencia, asistencia]);

  const handleLlamar = () => {
    alert("se esta llamando al colaborador (:");
  };
  return (
    <AsistenciaLayout>

      <TableAsistencia />
      {/* <div className="table-responsive-xl contendorTable">
        <table className="table table-sm table-striped  table-hover">
          <thead className="tableHeader">
            <tr className="tableHeaders itemsCenterHeader">
              <th>ASISTENCIA_ID</th>
              <th>EMPLEADO_ID</th>
              <th>FECHA_ASIS</th>
              <th>HORA_ASIS</th>
              <th>FECHA_CIERRE</th>
              <th>HORA_CIERRE</th>
              <th>ID_PUESTO</th>
              <th>DESCRIPCION_P</th>
              <th>CARGO</th>
              <th>CLIENTE</th>
              <th>UBICACION</th>
              <th>DIRECCION</th>
              <th>FEC_PROG</th>
              <th>HORA_PROG</th>
              <th>FEC_FIN</th>
              <th>HORA_FIN</th>
              <th>INCIDENCIA</th>
              <th>ESTADO_ASIST</th>
              <th>LLAMAR</th>
            </tr>
          </thead>
          <tbody className="">
            {itemsShows.map((datos, index) => (
              <tr>
                <td>{datos.ASISTENCIA_ID}</td>
                <td>{datos.ASISTENCIA_EMPLEADOID}</td>
                <td>{datos.ASISTENCIA_FECHA}</td>
                <td>{datos.ASISTENCIA_HORA}</td>
                <td>{datos.ASISTENCIA_FECHAC}</td>
                <td>{datos.ASISTENCIA_HORAC}</td>
                <td>{datos.ASISTENCIA_IDPUESTO}</td>
                <td>{datos.COPTO_DESCRIPCION}</td>
                <td>{datos.ASISTENCIA_CARGOID}</td>
                <td>{datos.CLIE_NOMBRE}</td>
                <td>{datos.CLIUBIC_NOMBRE}</td>
                <td>{datos.CLIUBIC_DIRECCION}</td>
                <td>{datos.HORA_FECINI}</td>
                <td>{datos.HORA_HORAINI}</td>
                <td>{datos.HORA_FECFIN}</td>
                <td>{datos.HORA_HORAFIN}</td>
                <td>{datos.HORA_INCIDENCIA}</td>
                <td>{datos.ESTADO_ASISTENCIA}</td>
                <td>
                  <button className="botonllamada" onClick={handleLlamar}>
                    <img className="llamada" src={Llamadas} alt="llamar"></img>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a
                    role="button"
                    className="page-link"
                    onClick={() => handleSetPage(page - 1)}
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" onClick={() => handleSetPage(1)}>
                    1
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" onClick={() => handleSetPage(2)}>
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" onClick={() => handleSetPage(3)}>
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => handleSetPage(page + 1)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </tfoot>
        </table>
      </div> */}
    </AsistenciaLayout>

  );
}
