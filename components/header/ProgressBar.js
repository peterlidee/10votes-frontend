import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
    NProgress.start();
}
Router.onRouteChangeComplete = () => {
    NProgress.done();
}
Router.onRouteChangeError = () => {
    NProgress.done();
}

const ProgressBar = () => (
    <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>
);

export default ProgressBar;