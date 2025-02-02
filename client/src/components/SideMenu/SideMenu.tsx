import { Avatar, Card, Flex, Menu, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./SideMenu.module.scss";
import { useAppContext } from "../../appContext/AppContext";

const SideMenu: React.FC = () => {
  const { id: activeChat } = useParams();
  const navigate = useNavigate();
  const {
    allUsers,
    strangers,
    isLoadingUsers,
    setSelectedUserId,
    onlineUsers,
  } = useAppContext();

  useEffect(() => {
    allUsers();
  }, []);

  // console.log(Object.keys(onlineUsers));

  if (isLoadingUsers) {
    return <div>Loading users...</div>;
  }

  return (
    <Flex vertical className={style["side-menu-container"]}>
      {strangers && (
        <Menu
          mode="inline"
          selectedKeys={[activeChat]} // 确保选中当前聊天对象
          className={style["menu-container"]}
        >
          {strangers.map((item, index) => (
            <Menu.Item
              key={item._id}
              onClick={() => {
                setSelectedUserId(item._id);
                navigate(`/${item._id}`);
              }}
              icon={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
            >
              <Flex vertical>
                <Typography.Text ellipsis strong>
                  {item.name}
                </Typography.Text>
                <Typography.Text ellipsis type="secondary">
                  Ant Design, a design language
                </Typography.Text>
              </Flex>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </Flex>
  );
};

export default SideMenu;
