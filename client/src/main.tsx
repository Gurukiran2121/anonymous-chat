import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppContextProvider from "./appContext/AppContext.tsx";
import { ConfigProvider, theme as AntTheme } from "antd";
import "./index.scss";

const config = {
  // 1. Use dark algorithm
  // algorithm: AntTheme.darkAlgorithm,

  // 2. Combine dark algorithm and compact algorithm
  // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  token : {
    colorPrimary : "#eb2f96",
    colorLink : "#eb2f96"
  },
  components : {
    Layout : {
      headerBg : "#ffffff",
      bodyBg : "#E7EBEE"
      // footerBg : "#ffffff",
      // lightSiderBg : "#ffffff"
    },
    Menu : {
      itemHeight : 70,
      collapsedIconSize : 24
    }

  }
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <AppContextProvider>
      <ConfigProvider theme={config}>
        <App />
      </ConfigProvider>
    </AppContextProvider>
  // </StrictMode>
);
