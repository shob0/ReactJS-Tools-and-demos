import React from 'react';

function SmallBox(props) {
    return (
        <div>
            <button className="btn btn-light btn-lg" style={{borderRadius: '0', border: '1px solid black', height: '50px', width: '55px'}} 
            onClick={
                (evt)=>{
                    props.clickhandler(evt);
                }
            } id={props.id}></button>
        </div>
    )
}

export default SmallBox