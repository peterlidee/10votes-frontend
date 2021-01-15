import Head from 'next/head'

const Meta = () => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.png" />
        {/* load roboto 400,400i, 700, 700i and carter one (one style) */}
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" /> 
        <title>10 votes!</title>
    </Head>
);

export default Meta;