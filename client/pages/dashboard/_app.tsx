import { Sidenav } from '@/components';
import store, { RootState } from '@/redux/store';
import { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

const dashboard = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/auth');
        }
    }, []);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default dashboard;
