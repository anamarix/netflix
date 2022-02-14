import React from 'react';
import arrowRight from '../../images/arrow-right.png';

function ButtonRight(props) {

    return (
<button className="switchRight sliderButton" onClick={(ev) => props.scrollRight(ev.target.parentElement.firstChild.nextSibling)} > <img src={arrowRight} alt="previous" /> </button>
    );
}

export default ButtonRight;