import  "./index.scss";
import {FC, ReactNode} from "react";

interface ModalPropsInterface {
    children: ReactNode;
    active: boolean;
    setActive:(active: boolean) => void;
}
const Modal:FC<ModalPropsInterface> = ({children, active, setActive}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal
