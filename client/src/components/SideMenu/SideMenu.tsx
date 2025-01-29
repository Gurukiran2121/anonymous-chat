import { Avatar, Flex, Layout, List, Typography } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import style from "./SideMenu.module.scss";

interface SideMenuProps {
  strangers: unknown[];
}

const SideMenu: React.FC<SideMenuProps> = ({ strangers }) => {
  const { id: activeChat } = useParams();

  return (
    <Flex vertical className={style["side-menu-container"]}>
      {strangers ? (
        <List
          itemLayout="horizontal"
          dataSource={strangers}
          renderItem={(item, index) => (
            <List.Item className={activeChat === item._id ? style["active-chat"] : ""}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a>{item.name}</a>}
                description={
                  <Typography.Text ellipsis type="secondary">
                    Ant Design, a design languageAnt Design, a design
                    languageAnt Design, a design languageAnt Design, a design
                    language
                  </Typography.Text>
                }
              />
            </List.Item>
          )}
        />
      ) : null}
    </Flex>
  );
};

export default SideMenu;
