import React from 'react';
import { Link } from 'react-router-dom';



function Tools() {
    return <div className="container">
        <div className="row">
            <div className="card text-white bg-success mb-3" style={{width: '200px', textAlign: 'center'}}>
                <div className="card-body">
                    <Link to="/tools/converter" className="text-white">
                        Temperature converter
                    </Link>
                </div>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-1"></div>
            <div className="card text-white bg-success mb-3">
                <div className="card-body" style={{width: '200px', textAlign: 'center'}}>
                    <Link to="/tools/Calculator" className="text-white">
                        Calculator
                    </Link>
                </div>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-1"></div>
            <div className="card text-white bg-success mb-3">
                <div className="card-body" style={{width: '200px', textAlign: 'center'}}>
                    <Link to="/tools/tictactoe" className="text-white">
                        Tic-Tac-Toe
                    </Link>
                </div>
            </div>
        </div>
    </div>
}

export default Tools;