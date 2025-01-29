import { Avatar, Layout, List, Typography } from "antd";
import React from "react";

interface SideMenuProps {
  strangers: unknown[];
}

const SideMenu: React.FC<SideMenuProps> = ({ strangers }) => {
  return (
    <Layout>
      {strangers ? (
        <List
          itemLayout="horizontal"
          dataSource={strangers}
          renderItem={(item, index) => (
            <List.Item onClick={() => alert("clicked")}>
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
    </Layout>
  );
};

export default SideMenu;
