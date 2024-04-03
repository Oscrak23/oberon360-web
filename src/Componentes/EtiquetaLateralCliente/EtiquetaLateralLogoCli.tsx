import AlpinaLogo from "@assets/Recursos/mapa/ALPINA-AZUL.png"
import './EtiquetaLateralLogoCli.css'

export default function EtiquetaLateralLogoCli() {
  return (
    <div className='contenedorLogo'>
      <img className='logo' src={AlpinaLogo} alt='Logo Usuario' />
    </div>
  )
}
