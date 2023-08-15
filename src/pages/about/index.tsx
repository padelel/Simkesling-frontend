import React from 'react';
import { useState, createContext, useContext } from "react";
import MainLayout from '@/components/MainLayout';
import { UserContext } from './about.context';

const AboutPage: React.FC = () => {
  const userContext = useContext(UserContext);
  return (
    <MainLayout>
        <h1>ini about</h1>
        <h2>{userContext.name }</h2>
    </MainLayout>
  );
};

export default AboutPage;
