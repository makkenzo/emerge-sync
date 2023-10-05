import store from '@/redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

function Home({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default Home;
