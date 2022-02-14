import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { useDispatch} from "react-redux";
import { closeModal } from "../../redux/actions/moviesActions";

function Modal(props) {
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <div className="ModalBackground"  onClick={() => dispatch(closeModal())}> 
      {props.children}
    </div>,
    document.getElementById("modal")
  );
}

export { Modal };
