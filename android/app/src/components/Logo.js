import React from 'react';
import SvgLogo from '../assets/logo.svg';

export default function Logo({ size = 100 }) {
  return (
    <SvgLogo width={size} height={size} />
  );
}