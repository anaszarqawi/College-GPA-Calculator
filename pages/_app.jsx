import Head from 'next/head';
import CalcContextProvider from '../contexts/calcContext';
import { ThemeProvider } from 'next-themes';
import { ToastContainer, toast } from 'react-toastify';

// Styles
import '../styles/globals.scss';
import '../styles/components.scss';
import '../styles/card.scss';
import '../styles/controlBar.scss';
import '../styles/gradeInput.scss';
import '../styles/gradePopup.scss';
import '../styles/header_footer.scss';
import '../styles/popup.scss';
import '../styles/totalResults.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>College GPA Calculator</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <CalcContextProvider>
        <ThemeProvider attribute="class">
          <main id="app">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </main>
          <ToastContainer bodyClassName="toast-body" toastClassName="toast" limit={3} />
        </ThemeProvider>
      </CalcContextProvider>
    </>
  );
};

export default App;
