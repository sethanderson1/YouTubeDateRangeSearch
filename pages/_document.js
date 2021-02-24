import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}

// TODO: below was to get fonts. above is so styled components work. want both.


// import Document, { Html, Head, Main, NextScript } from 'next/document'

// class MyDocument extends Document {
//     static async getInitialProps(ctx) {
//         const initialProps = await Document.getInitialProps(ctx)
//         return { ...initialProps }
//     }

//     render() {
//         return (
//             <Html>
//                 <Head>
//                     <link rel="preconnect" href="https://fonts.gstatic.com" />
//                     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
//                 </Head>
//                 <body>
//                     <Main />
//                     <NextScript />
//                 </body>
//             </Html>
//         )
//     }
// }

// export default MyDocument