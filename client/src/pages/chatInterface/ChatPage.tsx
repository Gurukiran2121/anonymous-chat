import { Layout } from "antd";
import React, { useEffect } from "react";
import styles from "./ChatPage.module.scss";
import HeaderChat from "../../components/header/HeaderChat";
import Conversation from "../../components/Conversation/Conversation";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useAppContext } from "../../appContext/AppContext";

const ChatPage: React.FC = () => {
  const { selectedUserId } = useAppContext();
  return (
    <Layout className={styles["chat-interface-main-container"]}>
      <Layout.Header>
        <HeaderChat />
      </Layout.Header>
      <Layout>
        <Layout.Sider
          collapsible
          breakpoint="lg"
          theme="light"
          width={300}
          className={styles["aside-side-menu-container"]}
        >
          <SideMenu />
        </Layout.Sider>
        <Layout.Content>
          {selectedUserId ? <Conversation /> : <div>welcome </div>}
        </Layout.Content>
      </Layout>
      {/* <Layout.Footer>Footer</Layout.Footer> */}
    </Layout>
  );
};

export default ChatPage;
