import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Biblioteca } from '../paginas/Biblioteca'
import {Home} from '../paginas/Home'
import {Oficinas} from '../paginas/Oficinas'
import {ProfiRegiao} from '../paginas/ProfiRegiao'
import { Profissionais } from '../paginas/Profissionais'
import { Principal } from '../componentes/layout/Principal'
import { Sobre } from '../paginas/Sobre'
import { Ansiedade } from '../paginas/Biblioteca/Ansiedade'
import {Cadastro} from '../paginas/Cadastro'
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

export function Rotas(){
    return(
        <BrowserRouter>
       <Routes>

    {/* Sem Layout */}
 

    {/* Com Layout */}
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
        <Route path="/definicoes" element={<Definicoes/>} />


    <Route path="/cadastro" element={<Cadastro />} />

       


    </Route>

</Routes>       
 </BrowserRouter>
    )

}
