import '@/styles/tailwind.css';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Site from '@/components/Layout/Site';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: any) {
    return (
        <Provider store={store}>
            <NextNProgress color="#0096FF" options={{ showSpinner: false }} />
            <Site layout={Component?.layout || 'default'} middleware={Component?.middleware}>
                <Component {...pageProps} />
            </Site>
            <Toaster
                toastOptions={{
                    duration: 5000,
                    style: { maxWidth: 'none', borderRadius: '4px', color: 'white' },
                    success: {
                        iconTheme: {
                            primary: 'white',
                            secondary: '#00ab55',
                        },
                        style: {
                            background: 'green',
                        },
                    },
                    error: {
                        style: {
                            background: '#e7515a',
                        },
                        iconTheme: {
                            primary: 'white',
                            secondary: '#e7515a',
                        },
                    },
                }}
            />
        </Provider>
    );
}
