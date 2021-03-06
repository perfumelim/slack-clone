import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import StarBoarderOutlineIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from "@material-ui/icons/Star";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

function Chat() {
  const [starred, setStarred] = useState(false);
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  const handleFav = () => {
    if (!starred) {
      db.collection("channels/starred").add({
        favorite: true,
      });
    }
  };

  const addFavorite = () => {
    setStarred(!starred);
    handleFav();
  };

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <IconButton onClick={addFavorite}>
                {starred ? (
                  <StarIcon></StarIcon>
                ) : (
                  <StarBoarderOutlineIcon></StarBoarderOutlineIcon>
                )}
              </IconButton>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}
    </ChatContainer>
  );
}
export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div``;

const IconButton = styled.div`
  > .MuiSvgIcon-root {
    font-size: 16px;
    padding-top: 5px;
  }
`;
