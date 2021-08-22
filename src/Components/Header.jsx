import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
  const [user] = useAuthState(auth);

  console.log("user is", user);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchBox>
          <SearchIcon />
          <input placeholder="Search" />
        </SearchBox>
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon />
        <HeaderUser>
          <HeaderAvatar
            onClick={() => auth.signOut()}
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <FiberManualRecordIcon />
        </HeaderUser>
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: var(--hover-color);
  color: white;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 0.2;
  align-items: center;
  justify-content: flex-end;

  > .MuiSvgIcon-root {
    padding-right: 13px;
    width: 22px;
    height: 22px;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: center;
  padding: 0 50px;
  border-radius: 6px;
  background-color: #644665;
  text-align: center;
  color: gray;
  border: 1px solid #644665;
`;

const SearchBox = styled.div`
  display: flex;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 27vw;
    outline: 0;
  }

  > input::placeholder {
    color: white;
  }

  > .MuiSvgIcon-root {
    color: white;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  > .MuiAvatar-img {
    display: block;
    width: 28px;
    height: 28px;
    border-radius: 4px;
  }
`;

const HeaderUser = styled.div`
  position: relative;
  padding-right: 16px;

  > .MuiSvgIcon-root {
    position: absolute;
    bottom: 0;
    right: 18px;
    font-size: 14px;
    color: green;
    background-color: var(--hover-color);
    border-radius: 45% 0;
  }
`;
