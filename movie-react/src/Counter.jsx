import React , {useState} from "react";

function Counter(){

    const [count , setCount] = useState(0);

    const plusCounter = () => {
        setCount(count + 1);
    }

    const minusCounter = () => {
        setCount(count - 1);
    }

    return(
        <>
        <div>
            <h1>{count}</h1>
            <button onClick={plusCounter}>+</button>
            <button onClick={minusCounter}>-</button>
        </div>
        </>
    )
}

export default Counter