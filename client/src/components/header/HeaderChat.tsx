import { Avatar, Dropdown, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useAppContext } from "../../appContext/AppContext";
import style from "./header.module.scss";

const HeaderChat: React.FC = () => {
  const { logOut, user } = useAppContext();

  const items = [
    {
      label: (
        <Flex vertical gap={6}>
          <Avatar size="default" icon={<UserOutlined />} />
          <Typography.Text>{user?.name}</Typography.Text>
          <Typography.Text type="secondary">{user?.email}</Typography.Text>
        </Flex>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Flex role="button" onClick={logOut}>
          LogOut
        </Flex>
      ),
      key: "1",
    },
  ];
  return (
    <Flex align="center" justify="end" className={style["main-chat-header"]}>
      <Flex align="center">
        <Dropdown trigger={["click"]} menu={{ items }}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </Flex>
    </Flex>
  );
};

export default HeaderChat;
