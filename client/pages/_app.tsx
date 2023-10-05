import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '@/redux/store';

import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
