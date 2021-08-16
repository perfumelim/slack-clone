import React from "react";
import styled from "styled-components";

function Message({ message, timestamp, user, userImage }) {
  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {user}
          {""}{" "}
          <span>
            {new Date(timestamp?.toDate()).toLocaleTimeString("ko-KR")}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  > img {
    height: 36px;
    width: 36px;
    border-radius: 8px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;
  > h4 > span {
    color: #616061 !important;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
