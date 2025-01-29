import { Layout, Spin } from "antd";
import AppRoutes from "./components/Routes";
import { useAppContext } from "./appContext/AppContext";

const { Content } = Layout;

function App() {
  const { isLoading } = useAppContext();
  return (
    <>
      <Spin spinning={isLoading}>
        <Layout className="main-layout-container">
          <Content>
            <AppRoutes />
          </Content>
        </Layout>
      </Spin>
    </>
  );
}

export default App;
