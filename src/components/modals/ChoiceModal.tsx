//Assets
import closeLogo from "./../../assets/icons/modal-close-icon.svg";
//Libraries
import Modal from "react-modal";
import { ChoiceModalProps } from "./types";
import { useState } from "react";
import { useEffect } from "react";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(23, 23, 23, 0.75)",
  } as any,
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "33rem",
    height: "10rem",
    backgroundColor: "white",
    boxShadow: "0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    borderRadius: "1rem",
    fontFamily: "'Open Sans Condensed', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  } as any,
};
const ChoiceModal = (props: ChoiceModalProps) => {
  const { header, description, openModal, closeModal, chooseYes, chooseNo } =
    props;
  let title: any;
  let subtitle: any;
  let choiceContainer: any;
  let yesBtn: any;
  let noBtn: any;
  let closeBtn: any;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      //remove listener when calling component unmounts
      window.removeEventListener("resize", handleResize);
    };
  });

  function afterOpenModal() {
    if (title) {
      //title style
      title.style.color = "#54595E";

      title.style.fontWeight = "600";
      title.style.marginBottom = "0.5rem";
    }
    if (subtitle) {
      // subtitle style
      subtitle.style.color = "#54595E";

      subtitle.style.fontWeight = "400";
      subtitle.style.marginBottom = "1rem";
    }
    //yes and no buttons
    //container
    choiceContainer.style.width = "100%";
    choiceContainer.style.display = "flex";
    choiceContainer.style.justifyContent = "center";

    //yes
    yesBtn.style.marginRight = "0.5rem";
    //no

    noBtn.style.marginLeft = "0.5rem";

    //close button style
    closeBtn.style.alignSelf = "flex-end";
    closeBtn.style.backgroundColor = "#E5E5E5";
    closeBtn.style.width = isMobile ? "1.2rem" : "1.5rem";
    closeBtn.style.height = isMobile ? "1.2rem" : "1.5rem";
    closeBtn.style.borderRadius = "1.8rem";
    closeBtn.style.padding = "4px";
    closeBtn.style.display = "flex";
    closeBtn.style.justifyContent = "center";
    closeBtn.style.alignItems = "center";
  }
  let modalStyle = isMobile
    ? {
        overlay: customStyles.overlay,
        content: {
          ...customStyles.content,
          width: "90%",
          height: "11rem",
          textAlign: "center",
        },
      }
    : customStyles;

  return (
    <>
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        ariaHideApp={false}
      >
        <button
          ref={(_closeBtn) => (closeBtn = _closeBtn)}
          onClick={closeModal}
          className="hover:border hover:border-solid hover:border-rose-200"
        >
          <img src={closeLogo} alt="close" />
        </button>
        {header && (
          <h1
            className="text-2xl md:text-3xl"
            ref={(_title) => (title = _title)}
          >
            {header}
          </h1>
        )}
        {description && (
          <h2 className="text-xl" ref={(_subtitle) => (subtitle = _subtitle)}>
            {description}
          </h2>
        )}
        <div ref={(_choiceContainer) => (choiceContainer = _choiceContainer)}>
          <button
            ref={(_yesBtn) => (yesBtn = _yesBtn)}
            onClick={chooseYes}
            className="btn btn-white bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-800 hover:border-gray-300  transition ease-out  duration-150 flex-1"
          >
            YES
          </button>
          <button
            ref={(_noBtn) => (noBtn = _noBtn)}
            onClick={chooseNo}
            className="btn btn-black hover:bg-[#333333] hover:text-neutral-100 border border-transparent hover:border-solid hover:border-zinc-900 transition ease-out  duration-150 flex-1"
          >
            NO
          </button>
        </div>
      </Modal>
    </>
  );
};
export default ChoiceModal;
