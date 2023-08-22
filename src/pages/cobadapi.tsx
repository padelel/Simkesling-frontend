import React, { useState, useEffect } from "react";
import api from "./utils/HttpRequest";
import { Select } from "antd";

const Cobadapi: React.FC = () => {
  const [datanya, setDatanya] = useState("");
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedValue, setSelectedValue] = useState<string>("");

  const clearData = () => {
    setDatanya("");
    setSelectedValue("");
    setOptions([]);
  };

  const getData = async () => {
    try {
      const response = await api.post("/user/kecamatan/data");
      const responseData = response.data.data.values;

      setOptions(
        responseData.map((item: { nama_kecamatan: any }) => ({
          value: item.nama_kecamatan,
          label: item.nama_kecamatan,
        }))
      );

      setDatanya(JSON.stringify(responseData, null, 4));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* <pre>{datanya}</pre> */}
      <button onClick={() => getData()}>Get Data</button>
      <button onClick={() => clearData()}>Clear Data</button>

      <br />
      <br />

      <Select
        style={{ width: 500 }}
        showSearch
        placeholder="Select kecamatan"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
        options={options}
      />
    </>
  );
};

export default Cobadapi;
