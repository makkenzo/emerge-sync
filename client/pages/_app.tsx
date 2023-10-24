import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '@/redux/store';
import { useEffect } from 'react';

import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <EdgeStoreProvider>
                <Component {...pageProps} />
            </EdgeStoreProvider>
        </Provider>
    );
}
