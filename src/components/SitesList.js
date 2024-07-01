// src/components/SitesList.js
import React from 'react';
import siteSettings from '../assets/data/siteUtils';
import styles from './SitesList.module.css';

const SitesList = ({ sites, displayType }) => {
    const currentUrl = siteSettings.siteUrl;
    const filteredSites = sites ? sites.filter(site => site.url !== currentUrl) : [];

  if (displayType === 'table') {
    return (
      <table className={styles.sitesTable}>
        <thead>
          <tr>
            <th>Website Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredSites.map((site, index) => (
            <tr key={index}>
              <td><a href={site.url} target="_blank" rel="noopener noreferrer">{site.name}</a></td>
              <td>{site.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <ul className={styles.sitesList}>
      {filteredSites.slice(0, 5).map((site, index) => (
        <li key={index}>
          <a href={site.url} target="_blank" rel="noopener noreferrer">{site.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default SitesList;
