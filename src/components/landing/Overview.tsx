import { Col, Image, Row } from "antd";
import React from "react";

const Overview = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <h1>Pengolahan Limbah B3</h1>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            eaque perspiciatis, accusantium deleniti enim voluptate maxime
            reiciendis sequi eius corporis magni, nobis asperiores totam at.
            Fugiat maiores libero molestias vel. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eos porro earum pariatur? Similique
            beatae rem facere? Odio, velit facere quaerat necessitatibus quam
            nihil, quas deserunt praesentium repellat aperiam voluptate. Earum?
          </p>
        </Col>

        <Col span={12}>
          <Image width={200} src="/gambar-carousel/industry.png" alt="truk" />
        </Col>
      </Row>
    </>
  );
};

export default Overview;
