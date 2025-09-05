import { Layout, Row, Col, Typography } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import React from "react";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const FooterLanding = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#f7f7f7", // Light grey background
        color: "#555", // Darker text for readability
        padding: "50px",
        borderTop: "1px solid #e8e8e8",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Row gutter={[48, 48]} justify="center">
          <Col xs={24} md={12}>
            <Title level={4} style={{ color: "#333" }}>
              Lokasi Kami
            </Title>
            <div style={{ height: "250px", width: "100%", borderRadius: "8px", overflow: "hidden" }}>
              <iframe
                src="https://maps.google.com/maps?q=dinas%20kesehatan%20kota%20depok&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Lokasi Dinas Kesehatan Kota Depok"
              ></iframe>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4} style={{ color: "#333" }}>
              Kontak & Informasi
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Text>
                <EnvironmentOutlined style={{ color: "#007BFF", marginRight: "10px" }} />
                Gedung Baleka II, Jl. Margonda Raya No.54, Depok, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431
              </Text>
              <Text>
                <PhoneOutlined style={{ color: "#007BFF", marginRight: "10px" }} />
                <Link href="tel:02129402281" style={{ color: "#555" }}>
                  021-29402281
                </Link>
              </Text>
              <Text>
                <MailOutlined style={{ color: "#007BFF", marginRight: "10px" }} />
                <Link href="mailto:dinkes@depok.go.id" style={{ color: "#555" }}>
                  dinkes@depok.go.id
                </Link>
              </Text>
            </div>
          </Col>
        </Row>
        <div style={{ textAlign: "center", marginTop: "50px", paddingTop: "20px", borderTop: "1px solid #e8e8e8" }}>
          <Text type="secondary">
            &copy; {new Date().getFullYear()} D&apos;SMILING - Dinas Kesehatan Kota Depok. All Rights Reserved.
          </Text>
        </div>
      </div>
    </Footer>
  );
};

export default FooterLanding;
