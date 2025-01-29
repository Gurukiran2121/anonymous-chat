import { Layout, Spin } from "antd";
import AppRoutes from "./components/Routes";
import { useAppContext } from "./appContext/AppContext";
import { BrowserRouter } from "react-router-dom";

const { Content } = Layout;

function App() {
  const { isLoading } = useAppContext();
  return (
    <BrowserRouter>
      <Spin spinning={isLoading}>
        <Layout className="main-layout-container">
          <Content>
            <AppRoutes />
          </Content>
        </Layout>
      </Spin>
    </BrowserRouter>
  );
}

export default App;
