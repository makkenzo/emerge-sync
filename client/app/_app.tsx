import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '@/redux/store';

function Home({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default Home;
