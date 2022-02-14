import React from 'react';
import './Fatal.css'


const Fatal = (props) => {
   return(
    <h2 className='center fatal'>
     {props.message}
    </h2>
   )

}

export default Fatal;