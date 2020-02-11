import React, { useState } from 'react';
import SmallBox from '../SmallBox/SmallBox';


function TicTacToe(props) {
     //condition param for checking which input to provide
     const [xPositions, setXPositions] = useState([]);
     const [oPositions, setOPositions] = useState([]);
     const [condition, setCondition] = useState(true);
     const [winner, setWinner] = useState(null);
     const [chaal, setChaal] = useState('X ki chaal.');
     const handleClick = (evt) => {
        if(winner === null) {
            if(evt.target.innerText === null || evt.target.innerText === '') {
                if(condition) {
                    evt.target.innerText = 'X';
                    const s = xPositions;
                    s.push(evt.target.id);
                    setXPositions(s);
                    setChaal('O ki chaal.');
                } else {
                    evt.target.innerText = 'O';
                    const s = oPositions;
                    s.push(evt.target.id);
                    setOPositions(s);
                    setChaal('X ki chaal.');
                }
                setCondition(!condition);
                //Selecting the winner if any
                validateWinner();
            }
        }
        else {
            alert(winner + ' Please Reset.')
        }
     }

     const validateWinner = () => {
         const l = [
             ['1','2','3'],
             ['1','4','7'],
             ['1','5','9'],
             ['4','5','6'],
             ['7','8','9'],
             ['3','6','9'],
             ['3','5','7'],
             ['2','5','8']
         ];
         l.forEach(i => {
             const [a, b, c] = i;
             if(xPositions.indexOf(a) !== -1 && xPositions.indexOf(b) !== -1 && xPositions.indexOf(c) !== -1) {
                setWinner('X has won the game.');
                setChaal(''); 
             }
             if(oPositions.indexOf(a) !== -1 && oPositions.indexOf(b) !== -1 && oPositions.indexOf(c) !== -1) {
                setChaal('');
            }
         })
     }

     const reset = () => {
         window.location.reload(false);
     }


        return (<div className="container">
            <div>
                <div className="row" style={{ textAlign: 'center' }}>
                    <div className="col-lg-5"></div>
                    <SmallBox clickhandler={handleClick} id={1}/>
                    <SmallBox clickhandler={handleClick} id={2}/>
                    <SmallBox clickhandler={handleClick} id={3}/>
                </div>
                <div className="row" style={{ textAlign: 'center' }}>
                    <div className="col-lg-5"></div>
                    <SmallBox clickhandler={handleClick} id={4}/>
                    <SmallBox clickhandler={handleClick} id={5}/>
                    <SmallBox clickhandler={handleClick} id={6}/>
                </div>
                <div className="row" style={{ textAlign: 'center' }}>
                    <div className="col-lg-5"></div>
                    <SmallBox clickhandler={handleClick} id={7}/>
                    <SmallBox clickhandler={handleClick} id={8}/>
                    <SmallBox clickhandler={handleClick} id={9}/>
                </div>
                <div className="row mt-4" style={{ textAlign: 'center' }}>
                    <div className="col-lg-4">
                        <span className="text-uppercase align-middle text-danger">{winner}</span>
                        </div>
                    <div className="col-lg-4">
                        <span className="text-uppercase align-middle text-danger">{chaal}</span>
                        </div>
                    <div className="col-lg-4">
                    <button className="btn btn-primary" onClick={reset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default TicTacToe;