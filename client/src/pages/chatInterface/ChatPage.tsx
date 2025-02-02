import { Flex, Layout } from "antd";
import React from "react";
import styles from "./ChatPage.module.scss";
import HeaderChat from "../../components/header/HeaderChat";
import Conversation from "../../components/Conversation/Conversation";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useAppContext } from "../../appContext/AppContext";
import LandingPage from "../../components/LandingContainer/LandingPage";
import Logo from "../../../public/logo.png";

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
          <Layout.Header className={styles["side-menu-header-container"]}>
            <Flex justify="center" align="center" className={styles["logo-container"]}>
              <img src={Logo} alt="logo" className={styles["logo-image"]}/>
            </Flex>
          </Layout.Header>
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
