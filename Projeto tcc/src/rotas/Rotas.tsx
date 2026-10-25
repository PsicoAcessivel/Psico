import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Biblioteca } from '../paginas/Biblioteca'
import { Home } from '../paginas/Home'
import { Oficinas } from '../paginas/Oficinas'
import { ProfiRegiao } from '../paginas/ProfiRegiao'
import { Profissionais } from '../paginas/Profissionais'
import { Principal } from '../componentes/layout/Principal'
import { Sobre } from '../paginas/Sobre'
import { Ansiedade } from '../paginas/Biblioteca/Ansiedade'
import { Cadastro } from '../paginas/Cadastro'
import { Depressao } from '../paginas/Biblioteca/Depressao'
import { Bullying } from '../paginas/Biblioteca/Bullying'
import { Futuro } from '../paginas/Biblioteca/Futuro'
import { Raiva } from '../paginas/Biblioteca/Raiva'
import { Saude } from '../paginas/Biblioteca/Saude'
import { Familia } from '../paginas/Biblioteca/Familia'
import { Drogas } from '../paginas/Biblioteca/Drogas'
import { Login } from '../paginas/Login'
import { Definicoes } from '../paginas/Definicoes'
import { Referencias } from '../paginas/Referencias'

import { RotaProtegida } from './RotaProtegida'
import { PainelAdmin } from '../paginas/admin/PainelAdmin'
import { DefinicoesFormulario } from '../paginas/admin/DefinicoesFormulario'
import { GerenciarDefinicoes } from '../paginas/admin/GerenciarDefinicoes'
import { OficinasFormulario } from '../paginas/admin/OficinasFormulario'
import { GerenciarOficinas } from '../paginas/admin/GerenciarOficinas'
import { ReferenciasFormulario } from '../paginas/admin/ReferenciasFormulario'
import { GerenciarReferencias } from '../paginas/admin/GerenciarReferencias'
import { GerenciarProfissionais } from '../paginas/admin/GerenciarProfissionais'
import { ProfissionaisFormulario } from '../paginas/admin/ProfissionaisFormulario'
import { GerenciarPerguntas } from '../paginas/admin/GerenciarPerguntas'
import { PerguntasFormulario } from '../paginas/admin/PerguntasFormularios'

export function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Página principal administrativa */}
                <Route
                    path="/admin"
                    element={
                        <RotaProtegida>
                            <PainelAdmin />
                        </RotaProtegida>
                    }
                />

                {/* Gerenciamento de definições */}
                <Route
                    path="/admin/definicoes"
                    element={
                        <RotaProtegida>
                            <GerenciarDefinicoes />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/definicoes/nova"
                    element={
                        <RotaProtegida>
                            <DefinicoesFormulario />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/definicoes/editar/:codigo"
                    element={
                        <RotaProtegida>
                            <DefinicoesFormulario />
                        </RotaProtegida>
                    }
                />

                {/* Gerenciamento de oficinas */}
                <Route
                    path="/admin/oficinas"
                    element={
                        <RotaProtegida>
                            <GerenciarOficinas />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/oficinas/nova"
                    element={
                        <RotaProtegida>
                            <OficinasFormulario />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/oficinas/editar/:codigo"
                    element={
                        <RotaProtegida>
                            <OficinasFormulario />
                        </RotaProtegida>
                    }
                />

                {/* Gerenciamento de referências */}
                <Route
                    path="/admin/referencias"
                    element={
                        <RotaProtegida>
                            <GerenciarReferencias />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/referencias/nova"
                    element={
                        <RotaProtegida>
                            <ReferenciasFormulario />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/referencias/editar/:codigo"
                    element={
                        <RotaProtegida>
                            <ReferenciasFormulario />
                        </RotaProtegida>
                    }
                />

                {/* Gerenciamento de profissionais */}
                <Route
                    path="/admin/profissionais"
                    element={
                        <RotaProtegida>
                            <GerenciarProfissionais />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/profissionais/novo"
                    element={
                        <RotaProtegida>
                            <ProfissionaisFormulario />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/profissionais/editar/:codigo"
                    element={
                        <RotaProtegida>
                            <ProfissionaisFormulario />
                        </RotaProtegida>
                    }
                />

                {/* Gerenciamento de perguntas e respostas */}
                <Route
                    path="/admin/perguntas"
                    element={
                        <RotaProtegida>
                            <GerenciarPerguntas />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/perguntas/novo"
                    element={
                        <RotaProtegida>
                            <PerguntasFormulario />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin/perguntas/editar/:codigo"
                    element={
                        <RotaProtegida>
                            <PerguntasFormulario />
                        </RotaProtegida>
                    }
                />

                {/* Páginas públicas com layout */}
                <Route element={<Principal />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/biblioteca" element={<Biblioteca />} />
                    <Route path="/oficinas" element={<Oficinas />} />
                    <Route path="/profiRegiao" element={<ProfiRegiao />} />
                    <Route path="/profissionais" element={<Profissionais />} />
                    <Route path="/raiva" element={<Raiva />} />
                    <Route path="/saude" element={<Saude />} />
                    <Route path="/depressao" element={<Depressao />} />
                    <Route path="/familia" element={<Familia />} />
                    <Route path="/drogas" element={<Drogas />} />
                    <Route path="/bullying" element={<Bullying />} />
                    <Route path="/futuro" element={<Futuro />} />
                    <Route path="/ansiedade" element={<Ansiedade />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/referencias" element={<Referencias />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/definicoes" element={<Definicoes />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
