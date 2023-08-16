import React from "react";
import MainLayout from "../components/MainLayout";
import { Button, Carousel } from "antd";
import { Header } from "antd/es/layout/layout";
import Headerlanding from "./Header/Headerlanding";
import Carrousellanding from "./landing/Carrousellanding";
import Formlogin from "./login/Formlogin";

const LandingPage: React.FC = () => {
  return (
    <>
      <Headerlanding />
      <Carrousellanding />
      <Formlogin />
    </>
  );
};

export default LandingPage;
