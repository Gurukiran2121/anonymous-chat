import { Card, Flex, Input } from "antd";
import React from "react";
import style from "./Conversation.module.scss";
import { SendOutlined } from "@ant-design/icons";

const Conversation: React.FC = () => {
  return (
    <Flex className={style["Conversation-main-container"]}>
      <Flex vertical justify="space-between" className={style["Conversation-box"]}>
        <Flex className={style["chats"]}>hello</Flex>
        <Flex className={style["footer"]}>
          <Card className={style["input-box"]} size="small">
            <Flex gap={12}>
              <Input variant="borderless" placeholder="send message" />
              <Flex align="center">
                <SendOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Conversation;
