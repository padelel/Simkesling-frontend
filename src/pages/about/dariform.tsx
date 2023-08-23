import MainLayout from "@/components/MainLayout";
import {
  useBearStore,
  usePengajuanTransporterStore,
} from "@/stores/pengajuanTransporterStore";
import { useEffect } from "react";

const DariForm: React.FC = () => {
  // const userContext = useContext(UserContext);
  const pengajuanTransporterStore = usePengajuanTransporterStore();
  useEffect(() => {
    console.log(Object.values(pengajuanTransporterStore));
  }, []);
  return (
    <MainLayout>
      <table>
        <tbody>
          {Object.keys(pengajuanTransporterStore).map((val, index) => (
            <tr key={index}>
              <td>{val}</td>
              <td>:</td>
              <td>
                {Object.values(pengajuanTransporterStore)[index]?.toString()}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default DariForm;
