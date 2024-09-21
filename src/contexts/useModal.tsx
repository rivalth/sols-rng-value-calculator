import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
  FC,
  useEffect,
} from "react";

interface ModalContextType {
  openModal: (content: ReactElement) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = useState<Array<ReactElement>>([]);

  const openModal = (content: ReactElement) => {
    if (!content || !content.type) return;
    setModalStack((prevStack) => [
      ...prevStack.filter((x) => x && x.type && x.type !== content.type),
      content,
    ]);
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {modalStack.length > 0 && (
        <div
          className={`fixed left-0 top-0 z-50 inset-0 w-full h-full flex items-center justify-center bg-black/50 transition-all`}
        >
          {modalStack[modalStack.length - 1]}
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
