import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { B3, B5, H1 } from "@/style/font";
import styled from "styled-components";
import { StageProps } from "./StageProps";

const charLimit = 12;

const SetName: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  return (
    <>
      <StTextContainer>
        <StH1>반가워요!</StH1>
        <StGap height="7px" />
        <StH1>닉네임을 만들어볼까요?</StH1>
        <StGap height="12px" />
        <StB3>닉네임은 나중에 언제든지 변경가능해요.</StB3>
      </StTextContainer>
      <StGap height="24px" />

      <StInputContainer>
        <TextInput
          placeholder="닉네임 입력"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          style={{ width: "100%" }}
        />
        <StGap height="4px" />
        <StCharLimit>
          <StB5>한글, 영문만 입력 가능</StB5>
          <StB5>
            {data.name.length} / {charLimit}
          </StB5>
        </StCharLimit>
      </StInputContainer>
      <StGap height="20px" />

      <Button
        size="large"
        active={data.name.length !== 0 && data.name.length <= charLimit}
        onClick={() => {
          console.log(data);
          onNext();
        }}
      >
        다음
      </Button>
    </>
  );
};

const StTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const StInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;
`;

const StCharLimit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 var(--spacing_8);
`;

const StH1 = styled.h1`
  ${H1}
  margin: 0px;
`;

const StB3 = styled.div`
  ${B3}
  color: var(--neutral_500);
`;

const StB5 = styled.div`
  ${B5}
  color: var(--neutral_500);
`;

const StGap = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`;

export default SetName;
