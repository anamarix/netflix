import React from 'react';
import arrowLeft from '../../images/arrow-left.png';
import './Buttons.css'

function ButtonLeft(props) {

    return (
<button className="switchLeft sliderButton" onClick={(ev)=>props.scrollLeft(ev.target.parentElement.firstChild.nextSibling)}> <img src={arrowLeft} alt="previous" /> </button>
    );
}

export default ButtonLeft;