import Button from "@/components/Button";
import styled from "styled-components"

interface CompleteModalProp {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompleteModal = ({ setModalOpen }: CompleteModalProp) => {

    return (
        <StCompleteModal>
            <div className="background" onClick={() => { setModalOpen(false); }}>
                <div className="content">
                    dsklajl;asdf;asdf
                    <Button size="small" onClick={() => setModalOpen(false)}>
                        확인
                    </Button>
                </div>
            </div>
        </StCompleteModal>
    )
}

const StCompleteModal = styled.div`
    .background{
        position : fixed;
        top : 0;
        left : 0;
        width : 100vw;
        height : 100vh;   
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.2);
        .content{
            width: 272px;
            height: 189px;
            padding : 28px 20px 20px;
            box-sizing: border-box;
            border-radius: var(--radius_16);
            background-color: white;
        }
    }
`;

export default CompleteModal