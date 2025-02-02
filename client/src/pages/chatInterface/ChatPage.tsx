import { Layout } from "antd";
import React from "react";
import styles from "./ChatPage.module.scss";
import HeaderChat from "../../components/header/HeaderChat";
import Conversation from "../../components/Conversation/Conversation";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useAppContext } from "../../appContext/AppContext";
import LandingPage from "../../components/LandingContainer/LandingPage";

const ChatPage: React.FC = () => {
  const { selectedUserId } = useAppContext();
  return (
    <Layout className={styles["chat-interface-main-container"]}>
      <Layout>
        <Layout.Sider
          collapsible
          breakpoint="lg"
          theme="light"
          width={300}
          className={styles["aside-side-menu-container"]}
        >
          <Layout.Header>HEADER</Layout.Header>
          <SideMenu />
        </Layout.Sider>

        <Layout>
          <Layout.Header className={styles["header-container"]}>
            <HeaderChat />
          </Layout.Header>
          <Layout.Content>
            {selectedUserId ? <Conversation /> : <LandingPage />}
          </Layout.Content>
        </Layout>
      </Layout>
      {/* <Layout.Footer>Footer</Layout.Footer> */}
    </Layout>
  );
};

export default ChatPage;
