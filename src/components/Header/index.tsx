import React from 'react';
import { Logo } from './Logo';
import { Title } from './Title';

export function Header() {
  return (
    <div className="text-center mb-12">
      <Logo />
      <Title />
    </div>
  );
}