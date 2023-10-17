import { EdgeStoreProvider } from '@/lib/edgestore';
import store, { RootState } from '@/redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const dashboard = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <EdgeStoreProvider>
                <Component {...pageProps} />
            </EdgeStoreProvider>
        </Provider>
    );
};

export default dashboard;
