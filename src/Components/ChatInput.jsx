import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button/Button";
import { db } from "../firebase";
import firebase from "firebase";

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "Perfume Lim",
      userImage:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=696&q=80",
    });

    chatRef.current.scrollIntoView({ behavior: "smooth" });

    setInput("");
  };
  return (
    <div>
      <ChatInputContainer>
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <Button hidden type="submit" onClick={sendMessage}>
            {" "}
            SEND
          </Button>
        </form>
      </ChatInputContainer>
    </div>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 10%;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
