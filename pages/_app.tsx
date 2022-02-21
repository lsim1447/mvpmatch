import '../styles/globals.css';
import '../styles/dropdown.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../libs/shared/ui/layouts/header/Header';
import Footer from '../libs/shared/ui/layouts/footer/Footer';
import { FiltersProvider } from '../libs/shared/utils/context/FiltersContext';
import { GatewayProvider } from '../libs/shared/utils/context/GatewayContext';
import { ProjectProvider } from '../libs/shared/utils/context/ProjectContext';
import { UserProvider } from '../libs/shared/utils/context/UserContext';

function MVPMatch({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="http://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        ></link>
      </Head>
      <UserProvider>
        <ProjectProvider>
          <GatewayProvider>
            <FiltersProvider>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </FiltersProvider>
          </GatewayProvider>
        </ProjectProvider>
      </UserProvider>
    </>
  );
}

export default MVPMatch;
