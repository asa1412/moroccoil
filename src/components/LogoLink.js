// src/components/LogoLink.js
import React from 'react';
import { Link } from 'next/link';
import './LogoLink.module.css';
import logoIcon from '../assets/images/blue-logo.svg';

const LogoLink = ({ className }) => (
  <Link href="/" className={`logo-link ${className}`}>
    <img src={logoIcon} alt="Logo" className="logo" />
  </Link>
);

export default LogoLink;