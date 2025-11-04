import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';

const publicRoutes = ['/login', '/signup'];

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(router.pathname);

    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }

    if (isAuthenticated && isPublicRoute) {
      router.push('/products');
    }
  }, [isAuthenticated, router.pathname]);

  return <>{children}</>;
}
