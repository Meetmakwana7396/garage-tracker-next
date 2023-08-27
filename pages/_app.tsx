import '@/styles/tailwind.css';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Site from '@/components/Layout/Site';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: any) {
    return (
        <Provider store={store}>
            <NextNProgress color="#0096FF" height={1} options={{ showSpinner: false }} />
            <Site layout={Component?.layout || 'default'} middleware={Component?.middleware}>
                <Component {...pageProps} />
            </Site>
            <Toaster
                toastOptions={{
                    duration: 5000,
                    style: { maxWidth: 'none', borderRadius: '4px', color: 'black' },
                    success: {
                        iconTheme: {
                            primary: 'green',
                            secondary: 'white',
                        },
                        style: {
                            border: '1px solid green',
                            backgroundColor: '#A9DFBF',
                        },
                    },
                    error: {
                        style: {
                            border: '1px solid #e7515a',
                            background: '#F5B7B1',
                        },
                        iconTheme: {
                            primary: '#e7515a',
                            secondary: 'white',
                        },
                    },
                }}
            />
        </Provider>
    );
}
