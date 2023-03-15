export type ChoiceModalProps = {
  header?: string;
  description?: string;
  openModal: boolean;
  closeModal: () => void;
  chooseYes: () => void;
  chooseNo: () => void;
};
