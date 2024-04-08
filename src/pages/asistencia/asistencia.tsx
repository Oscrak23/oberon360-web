import AsistenciaLayout from '@/layouts/Asistencia/asistenciaLayout';
import TableAsistencia from "@/Componentes/Table/TableAsistencia";
import { useEffect, useState } from 'react';
import { getAsistencia } from '../../api/conexiones.api';

export default function Asistencia() {

  const [asistencia, setAsistencia] = useState([]);

  const getData = async () => {
    const response = await getAsistencia();
    console.log(response);
    setAsistencia(response.data.data);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <AsistenciaLayout>

      <TableAsistencia data={asistencia} />

    </AsistenciaLayout>

  );
}
