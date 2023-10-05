// import { ReactNode, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import { RootState } from '../redux/store';

// const PrivateRoute = ({ children }: { children: ReactNode }) => {
//     const router = useRouter();
//     const token = useSelector((state: RootState) => state.auth.token);

//     useEffect(() => {
//         if (!token) {
//             router.push('/auth');
//         }
//     }, [token, router]);

//     return <>{children}</>;
// };

// export default PrivateRoute;
