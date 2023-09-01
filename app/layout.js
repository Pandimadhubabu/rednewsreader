import '../styles/globals.css'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>News Links</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png" />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
