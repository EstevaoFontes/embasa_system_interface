import { AppProvider } from './contexts'

export const AppProvider = ({ children }) => {
    return (
        <AppProvider>{children}</AppProvider>
    )
}