"use client";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login');
      } else if (role && user.role !== role) {
        router.push('/');
      }
    }
  }, [user, loading, role, router]);

  if (loading || !user || (role && user.role !== role)) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return children;
};

export default ProtectedRoute;
