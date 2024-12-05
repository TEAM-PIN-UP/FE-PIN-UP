import Header from "@/components/Header";
import edit from "@/image/icons/edit.svg";
import { H2 } from "@/style/font";
import styled from "styled-components";
import Card from "./_components/Card";

const EditorArticlePage = () => {
  return (
    <StDiv>
      <Header>
        <Header.Left>
          <span className="header-title">에디터 아티클</span>
        </Header.Left>
        <Header.Right>
          <img src={edit} />
        </Header.Right>
      </Header>
      <div className="cards">
        {[...Array(6)].map((_, index) => (
          <Card
            key={index}
            image={`https://picsum.photos/200?random=${index}`}
            title="합정역 아인슈페너 맛집 15 곳"
            date="2024.09"
          />
        ))}
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  padding: 68px var(--spacing_20);

  .header-title {
    ${H2}
  }

  .cards {
  }
`;

export default EditorArticlePage;
