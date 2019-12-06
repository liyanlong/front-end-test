// 用 react hook 替换掉 componentDidMount 和 componentDidUpdate
import React, { useState, useEffect, } from 'react';

function Example() {
   const [count, setCount] = useState(0);
   useEffect(() => {
        document.title = `You clicked ${count} times`;
   });

   return (
       <div>
           <p>count: {count}</p>
           <button onClick={() => {setCount(count + 1)}}>add one</button>
       </div>
   )
}

export {
    Example
}