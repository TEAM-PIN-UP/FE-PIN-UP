import styled from "styled-components";

interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ selected = false, onClick, children }) => {
  return (
    <StButton onClick={onClick} selected={selected}>
      {children}
    </StButton>
  );
};

const StButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) =>
    selected ? "var(--neutral_800)" : "var(--neutral_50)"};
  border-radius: var(--radius_24);
  color: ${({ selected }) =>
    selected ? "var(--white)" : "var(--neutral_800)"};
  gap: var(--spacing_4);
  height: 36;
  padding: var(--spacing_10) var(--spacing_12);
`;

export default Chip;
