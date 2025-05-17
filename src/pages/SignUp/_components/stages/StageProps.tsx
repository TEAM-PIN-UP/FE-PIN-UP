import { SignUpForm } from "../../SignUpInterface";

export interface StageProps {
  data: SignUpForm;
  updateData: (updatedData: Partial<SignUpForm>) => void;
  onNext: () => void;
}
