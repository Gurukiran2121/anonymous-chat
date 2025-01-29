import { Layout } from "antd";
import React, { useEffect } from "react";
import styles from "./ChatPage.module.scss";
import HeaderChat from "../../components/header/HeaderChat";
import Conversation from "../../components/Conversation/Conversation";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useAppContext } from "../../appContext/AppContext";

const ChatPage: React.FC = () => {
  const { allUsers, strangers } = useAppContext();
  
  useEffect(() => {
    allUsers();
  }, []);

  return (
    <Layout className={styles["chat-interface-main-container"]}>
      <Layout.Header>
        <HeaderChat />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={300}>
          <SideMenu strangers={strangers} />
        </Layout.Sider>
        <Layout.Content>
          <Conversation />
        </Layout.Content>
      </Layout>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  );
};

export default ChatPage;
