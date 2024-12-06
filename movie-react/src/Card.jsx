import React from "react"
import propsType from "prop-types"

function Card(props){
    let count = 0;
    const handleClick = (e) => {
        if(count < 3){
            count++;
            e.target.textContent = "Don't Click" ;
            alert(`Hi ${e} you click me ${count} times`)
        }else{
            alert(`Not Hi ${e}`)
        }
    };
    return(
        <>
        <div className="card shadow-sm" style={{width: "18rem", margin:"10px",display:"inline-block"}}>
          <img src="https://via.placeholder.com/150" className="card-img-top" alt="The Img"/>
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button onDoubleClick={(e)=> handleClick(e)} className="btn btn-primary">Go somewhere</button>
          </div>
        </div>
        </>
    );
}

Card.defaultProps ={
    name:"Member",
    age:25,
}

export default Card