import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '@/redux/store';
import { useEffect } from 'react';

import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { EdgeStoreProvider } from '@/lib/edgestore';

import { useRouter } from 'next/router';
import { registerLicense } from '@syncfusion/ej2-base';

export default function App({ Component, pageProps }: AppProps) {
    registerLicense('ORg4AjUWIQA/Gnt2VlhhQlJCfV5DQmVWfFN0RnNRdVt0flZBcC0sT3RfQF5iSX5Udk1mXH1bdHJQQg==');
    return (
        <Provider store={store}>
            <EdgeStoreProvider>
                <Component {...pageProps} />
            </EdgeStoreProvider>
        </Provider>
    );
}
