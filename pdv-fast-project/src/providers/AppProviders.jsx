
import { AuthProvider } from "../contexts/AuthContext";
import { MenuProvider } from "../contexts/MenuContext";
import { OrderProvider } from "../contexts/OrderContext";
import { ToastProvider } from "../contexts/ToastContext";


export function AppProviders({ children }) {
    return (
        <ToastProvider>
            <AuthProvider>
                <MenuProvider>
                    <OrderProvider>
                        {children}
                    </OrderProvider>
                </MenuProvider>
            </AuthProvider>
        </ToastProvider>
    );
}

