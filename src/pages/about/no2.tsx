import MainLayout from "@/components/MainLayout";
import { useBearStore } from "@/stores/pengajuanTransporterStore";

const About2Page: React.FC = () => {
  // const userContext = useContext(UserContext);
  const bears: any = useBearStore();

  return <MainLayout>data dari sebelah {bears.bears}</MainLayout>;
};

export default About2Page;
