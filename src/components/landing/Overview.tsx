import { Card, Col, Row, Typography } from "antd";
import { TruckOutlined, ExperimentOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";

const { Title, Paragraph } = Typography;

const cardStyle: React.CSSProperties = {
  border: "1px solid #f0f0f0",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center",
  boxShadow: "none", // Remove heavy shadow
  height: "100%", // Make cards same height
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const cardHoverStyle: React.CSSProperties = {
  transform: "translateY(-5px)",
  boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
};

const Overview: React.FC = () => {
  const [hovered1, setHovered1] = React.useState(false);
  const [hovered2, setHovered2] = React.useState(false);
  const [hovered3, setHovered3] = React.useState(false);

  return (
    <>
      <Title level={2} style={{ textAlign: "center", marginBottom: "50px" }}>
        Fitur Utama Kami
      </Title>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={12} lg={8}>
          <Card
            style={{ ...cardStyle, ...(hovered1 ? cardHoverStyle : {}) }}
            bordered={false}
            onMouseEnter={() => setHovered1(true)}
            onMouseLeave={() => setHovered1(false)}
          >
            <TruckOutlined style={{ fontSize: "48px", color: "#007BFF", marginBottom: "20px" }} />
            <Title level={3}>Manajemen Transporter</Title>
            <Paragraph>
              Lacak dan kelola pengajuan serta operasional transporter limbah medis dengan mudah. Pastikan semua pihak ketiga memenuhi standar dan regulasi yang berlaku.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Card
            style={{ ...cardStyle, ...(hovered2 ? cardHoverStyle : {}) }}
            bordered={false}
            onMouseEnter={() => setHovered2(true)}
            onMouseLeave={() => setHovered2(false)}
          >
            <ExperimentOutlined style={{ fontSize: "48px", color: "#007BFF", marginBottom: "20px" }} />
            <Title level={3}>Pelaporan Limbah</Title>
            <Paragraph>
              Sederhanakan proses pelaporan limbah B3, baik limbah padat maupun cair. Hasilkan laporan bulanan dan rekapitulasi tahunan secara akurat dan cepat.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <a
            href="https://drive.google.com/drive/folders/1g5oZ2-3zfQk2UIGa2JxpWSauIg_pwqDS"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card
              style={{ ...cardStyle, ...(hovered3 ? cardHoverStyle : {}) }}
              bordered={false}
              onMouseEnter={() => setHovered3(true)}
              onMouseLeave={() => setHovered3(false)}
            >
              <QuestionCircleOutlined style={{ fontSize: "48px", color: "#007BFF", marginBottom: "20px" }} />
              <Title level={3}>Petunjuk Pemakaian</Title>
              <Paragraph>
                Butuh bantuan? Lihat panduan lengkap penggunaan aplikasi D&apos;SMILING untuk memulai.
              </Paragraph>
            </Card>
          </a>
        </Col>
      </Row>
    </>
  );
};

export default Overview;
