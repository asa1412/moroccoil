// src/pages/index.js
import React from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import ArticleList from '../components/ArticleList';
import siteSettings from '../utils/siteUtils';

const Home = () => {
  return (
    <div>
      <Head>
        <title>{siteSettings.homePageTitle}</title>
        <meta name="description" content={siteSettings.homePageDescription} />
      </Head>
      <Hero />
      <ArticleList />
    </div>
  );
};

export default Home;
