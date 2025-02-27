import styled from "styled-components";
import PinbuddyListHeader from "./_components/Header";
import { useState } from "react";
// import useFriendList from "@/hooks/api/pinbuddyList/useFriendList";
// import PinbuddySingle from "./_components/PinbuddySingle";

type PinbuddyListState = "friend" | "received" | "request";

const PinbuddyList = () => {
  const [currentState, setCurrentState] = useState<PinbuddyListState>("friend");
  const state = {
    friend: "핀버디",
    received: "받은 신청",
    request: "보낸 신청",
  };

  // const {data} = useFriendList();

  return (
    <div>
      <StBlock />
      <PinbuddyListHeader />
      <StBody>
        <div onClick={() => setCurrentState("friend")}>핀버디</div>
        <div onClick={() => setCurrentState("received")}>받은 신청</div>
        <div onClick={() => setCurrentState("request")}>보낸 신청</div>
      </StBody>
      <div>
        <p>
          <span>{state[currentState]}</span>
          <span>24</span>
        </p>
        <div>{/* {data?.map((val)=><PinbuddySingle data={val}/>)} */}</div>
      </div>
    </div>
  );
};

const StBody = styled.div`
  display: flex;

  width: 100%;
`;

const StBlock = styled.div`
  width: 100%;
  height: 44px;
`;

export default PinbuddyList;
