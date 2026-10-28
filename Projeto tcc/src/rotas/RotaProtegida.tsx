import { type ReactNode } from 'react'

interface RotaProtegidaProps {
    children: ReactNode
}

export function RotaProtegida({ children }: RotaProtegidaProps) {
    return <>{children}</>
}
