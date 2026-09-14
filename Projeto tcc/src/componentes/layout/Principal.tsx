import estilos from './Principal.module.css'

import { Menu } from './Menu'
import { Rodape } from './Rodape'
import { Outlet } from 'react-router-dom'

export function Principal() {
    return (
        <div className={estilos.gridConteiner}>

            <div className={estilos.menu}>
                <Menu />
            </div>

            <div className={estilos.conteudo}>
                <Outlet />
            </div>

            <div className={estilos.rodape}>
                <Rodape />
            </div>

        </div>
    )
}