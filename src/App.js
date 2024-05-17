import React, {useState, useEffect} from "react";
import "../styles/app.css"
import Widget from "./Widget";



function MyApp() {

  const [products,setProducts] = useState([]);

  useEffect(()=> {
    fetch('https://fakestoreapi.com/products?limit=5')
    .then(res=>res.json())
    .then(json=> {
      setProducts(json.map(j=> j?.title));
    })
  },[])

  return <>
    <h1>Hello, world!</h1>
    <main>
      <Widget data={["male","female"]}/>
      <Widget data={["zoo","disney","beach"]}/>
      <Widget data={products}/>
    </main>
  </>
}

export default MyApp;