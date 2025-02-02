import { Avatar, Card, Flex, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import style from "./Conversation.module.scss";
import { SendOutlined } from "@ant-design/icons";
import { useAppContext } from "../../appContext/AppContext";

const Conversation: React.FC = () => {
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef(null);
  const {
    user,
    postMessage,
    conversation,
    getConversation,
    selectedUserId,
    getRealTimeMessage,
    stopRealTimeMessage,
    isLoadingConversation,
  } = useAppContext();

  const handleMessage = (event) => {
    const userMessage = event.target.value;
    setMessage(userMessage);
  };

  useEffect(() => {
    getConversation(selectedUserId);
  }, [selectedUserId]);

  useEffect(() => {
    getRealTimeMessage();

    return () => {
      stopRealTimeMessage();
    };
  }, [conversation]);

  const handlePostMessage = () => {
    postMessage(
      {
        message: message,
      },
      selectedUserId
    );
    setMessage("");
  };

  useEffect(() => {
    // Smooth scroll to bottom when new messages arrive
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [conversation]);

  if (isLoadingConversation) {
    return <>Loading conversation...</>;
  }

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
            conversation.map((msg, index) => (
              <Flex
                align="center"
                gap={8}
                key={msg._id}
                justify={msg.senderID === user?._id ? "end" : "start"} // 右对齐发送的消息，左对齐接收的消息
                ref={index === conversation.length - 1 ? lastMessageRef : null}
              >
                {msg.senderID !== user?._id && <Avatar />}{" "}
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
                {msg.senderID === user?._id && <Avatar />}{" "}
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
                value={message}
                onPressEnter={handlePostMessage}
              />
              <Flex align="center" onClick={handlePostMessage}>
                <SendOutlined
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#d9d9d9",
                  }}
                />
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Conversation;
