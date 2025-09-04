// login page
import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Button, Carousel, Layout, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

import HeaderLanding from "../components/header/HeaderLanding";
import CarrouselLanding from "../components/landing/CarrouselLanding";
import FormLogin from "@/components/login/FormLogin";
import Overview from "@/components/landing/Overview";

const { Header, Content, Footer } = Layout;

const LandingPage: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    // Menentukan apakah lebar layar kurang dari 400
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 400);
    };

    // Mendaftarkan event listener untuk mengawasi perubahan lebar layar
    window.addEventListener("resize", handleResize);

    // Menginisialisasi isSmallScreen saat pertama kali memuat halaman
    handleResize();

    // Membersihkan event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <HeaderLanding />
        <CarrouselLanding />
        <Overview />

        <Footer
          style={{
            borderTop: "1px solid #e8e8e8",
            backgroundColor: "#007BFF",
            color: "#fff",
            textAlign: "center",
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column", // Mengubah tata letak menjadi kolom di ponsel
            }}>
            <div style={{ width: "100%" }}>
              <h2 style={{ color: "#fff" }}>
                Lokasi Dinas Kesehatan Kota Depok
              </h2>
              <iframe
                src="https://maps.google.com/maps?q=dinas%20kesehatan%20kota%20depok&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                width={isSmallScreen ? "200" : "300"} // Menggunakan kondisi isSmallScreen
                height="200"
                style={{ border: "" }}
                loading="lazy"></iframe>
            </div>
            <div style={{ width: "100%" }}>
              <h2 style={{ color: "#fff" }}>Kontak</h2>
              <p>
                <PhoneOutlined style={{ color: "#fff", marginRight: "5px" }} />
                Nomor Telepon: 02129402281
              </p>
              <p>
                <MailOutlined style={{ color: "#fff", marginRight: "5px" }} />
                Email: dinkes@depok.go.id
              </p>
              <p>
                <EnvironmentOutlined
                  style={{ color: "#fff", marginRight: "5px" }}
                />
                Lokasi: Gedung Baleka II, Jl. Margonda Raya No.54, Depok, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431
              </p>
              <p>&copy; 2023 D’Smiling Dinkes Kota Depok</p>
            </div>
          </div>
        </Footer>
      </Space>
    </>
  );
};

export default LandingPage;
