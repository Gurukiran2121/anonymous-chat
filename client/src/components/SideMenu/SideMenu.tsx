import { Avatar, Flex, List, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./SideMenu.module.scss";
import { useAppContext } from "../../appContext/AppContext";

interface SideMenuProps {
  strangers: unknown[];
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { id: activeChat } = useParams();
  const  navigate = useNavigate();
  const { allUsers, strangers, isLoadingUsers, setSelectedUserId} =
    useAppContext();

  useEffect(() => {
    allUsers();
  }, []);

  if (isLoadingUsers) {
    return <div>loading users...</div>;
  }

  return (
    <Flex vertical className={style["side-menu-container"]}>
      {strangers ? (
        <List
          itemLayout="horizontal"
          dataSource={strangers}
          renderItem={(item, index) => (
            <List.Item
              className={activeChat === item._id ? style["active-chat"] : ""}
              onClick={() => {
                setSelectedUserId(item._id);
                navigate(`/${item._id}`)
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={item.name}
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
