import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="p-4">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


