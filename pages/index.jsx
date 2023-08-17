import React from 'react';
import Button from '../components/Button';
import Styles from '../styles/containers.module.scss';
import Image from 'next/image';
import logo from '../public/logo.png';
import FadeChildren from '../components/FadeChildren';
import MiniLabel from '../components/MiniLabel';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>College GPA Calculator</title>
      </Head>
      <div className="center-content-page">
        <div className={Styles.flexColumnFullWidth}>
          <FadeChildren>
            <Image src={logo} alt="logo" width={150} height={150} className="logo-icon" />
            <div className="center-title landpage-title">College GPA Calculator</div>
            <Button label="Jump to Calculator" path="/calculator" isPrimary={true} />
            <div className="version mobile">
              v3.0
              <MiniLabel label="Beta" />
            </div>
          </FadeChildren>
        </div>
      </div>
    </>
  );
};

export default Home;
