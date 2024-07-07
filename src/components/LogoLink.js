// src/components/LogoLink.js
import React from 'react';
import { Link } from 'next/link';
import './LogoLink.module.css';
import logoIcon from '../assets/images/blue-logo.svg';
import Image from 'next/image'

const LogoLink = ({ className }) => (
  <Link href="/" className={`logo-link ${className}`}>
    <Image src={logoIcon} alt="Logo" className="logo" />
  </Link>
);

export default LogoLink;