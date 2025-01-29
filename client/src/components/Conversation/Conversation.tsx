import { Card, Flex, Input } from "antd";
import React, { useEffect, useState } from "react";
import style from "./Conversation.module.scss";
import { SendOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../appContext/axiosInstance";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../appContext/AppContext";

const Conversation: React.FC = () => {
  const [message, setMessage] = useState("");
  const { user, postMessage, conversation, getConversation } = useAppContext();

  const handleMessage = (event) => {
    const userMessage = event.target.value;
    setMessage(userMessage);
  };

  const { id: userToSend } = useParams();

  useEffect(() => {
    getConversation(userToSend);
  }, []);

  return (
    <Flex className={style["Conversation-main-container"]}>
      <Flex
        vertical
        justify="space-between"
        className={style["Conversation-box"]}
      >
        <Flex className={style["chats"]} vertical gap={8}>
          {conversation &&
            Array.isArray(conversation) &&
            conversation.length > 0 &&
            conversation.map((msg) => (
              <Flex
                key={msg._id}
                justify={msg.senderID === user?._id ? "end" : "start"}
              >
                <Card
                  size="small"
                  className={
                    msg.senderID === user?._id
                      ? style["message-sent"]
                      : style["message-received"]
                  }
                >
                  {msg.message}
                </Card>
              </Flex>
            ))}
        </Flex>
        <Flex className={style["footer"]}>
          <Card className={style["input-box"]} size="small">
            <Flex gap={12}>
              <Input
                variant="borderless"
                placeholder="send message"
                onChange={handleMessage}
              />
              <Flex
                align="center"
                onClick={() => {
                  postMessage(
                    {
                      message: message,
                    },
                    userToSend
                  );
                  setMessage("");
                }}
              >
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
