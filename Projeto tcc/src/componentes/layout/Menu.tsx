import estilos from './Menu.module.css'
import logo from '../../assets/imagens/logoPsicoAcessivel.png'
import { Link, useLocation } from 'react-router-dom'

type ItemMenu = {
    rota: string
    rotulo: string
}

export function Menu() {

    const location = useLocation()

    const itensMenu: ItemMenu[] = [
        {
            rota: '/',
            rotulo: 'Inicial'
        },
        {
            rota: '/biblioteca',
            rotulo: 'Biblioteca de Conteúdos'
        },
        {
            rota: '/oficinas',
            rotulo: 'Oficinas'
        },
        {
            rota: '/profissionais',
            rotulo: 'Profissionais'
        },
        {
            rota: '/sobre',
            rotulo: 'Sobre'
        },
        {
            rota: '/referencias',
            rotulo: 'Referências'
        },
        {
            rota: '/login',
            rotulo: 'Login'
        },
        {
            rota: '/cadastro',
            rotulo: 'Cadastro'
        }
    ]

    return (
        <header className={estilos.container}>

            <div className={estilos.logoContainer}>

                <img
                    src={logo}
                    alt="Logo Psico-Acessível"
                    className={estilos.logo}
                />

                <span className={estilos.nome}>
                    Psico-Acessível
                </span>

            </div>

            <nav className={estilos.menu}>

                {itensMenu.map((item) => {

                    const ativo =
                        item.rota === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(item.rota)

                    // Biblioteca possui um submenu
                    if (item.rota === '/biblioteca') {
                        return (
                            <div
                                className={estilos.submenuContainer}
                                key={item.rota}
                            >

                                <span
                                    className={`${estilos.item} ${ativo ? estilos.ativo : ''}`}
                                >
                                    {item.rotulo}
                                </span>

                                <div className={estilos.submenu}>

                                    <Link to="/biblioteca">
                                        Perguntas e Respostas
                                    </Link>

                                    <Link to="/definicoes">
                                        Definições
                                    </Link>

                                </div>

                            </div>
                        )
                    }

                    return (
                        <Link
                            key={item.rota}
                            to={item.rota}
                            className={`${estilos.item} ${ativo ? estilos.ativo : ''}`}
                        >
                            <span>{item.rotulo}</span>
                        </Link>
                    )
                })}

            </nav>

        </header>
    )
}