import { Card, Flex, Input } from "antd";
import React, { useEffect, useState } from "react";
import style from "./Conversation.module.scss";
import { SendOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../appContext/axiosInstance";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../appContext/AppContext";

const Conversation: React.FC = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const { user } = useAppContext();

  const handleMessage = (event) => {
    const userMessage = event.target.value;
    setMessage(userMessage);
  };

  const { id: userToSend } = useParams();

  const handlePostMessage = async () => {
    try {
      const payload = {
        message: message,
      };
      const response = await axiosInstance.post(
        `/message/send/${userToSend}`,
        payload
      );

      setConversation(response.data);
    } catch (error) {
      console.error(`Error sending message ${error}`);
    }
  };

  const getConversation = async () => {
    try {
      const response = await axiosInstance.get(`/message/${userToSend}`);
      setConversation(response.data);
    } catch (error) {
      console.error(`Error getting the conversation ${error}`);
    }
  };

  useEffect(() => {
    getConversation();
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
              <Flex align="center" onClick={handlePostMessage}>
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
