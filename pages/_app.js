import Head from 'next/head';
import React from "react";
import { Global, css } from '@emotion/react';
// JS COMPONENTS
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';

function MyApp({ Component, pageProps }) {
  return (
	<>
		<Head>
			{/* {/* Favicons */}
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
			<meta name="msapplication-TileColor" content="#da532c" />
			<meta name="theme-color" content="#ffffff" />
			<meta name="lang" content="en" />
			{/* facebook/Twiiter og site */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="chat" />
			<meta id="twitter-image" name="twitter:image" content="/favicon-32x32.png" />
			<meta property="og:url" content="" />
			<meta property="og:type" content="product" />
			<meta property="og:site_name" content=""/>
			<meta id="og-image" property="og:image" content="/favicon-32x32.png"/>
		</Head>
		<Global
			styles={css`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
					overflow: hidden;
				}

				* {
					box-sizing: border-box;
				}
			`}
		/>
		<div style={{display:"flex", flexDirection:"column", height:"100vh", width:"100%"}}>
			<Navbar />
			<Component {...pageProps} />
			<Footer />
		</div>

	</>
	)
}

export default MyApp;
