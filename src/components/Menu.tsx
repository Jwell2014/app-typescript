import { useState } from "react";

interface Iprops{
    data:string[];
    onClick?: (index:number)=>{} | void;
    selected?:number;
    propsClassName?:string;
}



const Menu = (props:Iprops) => {
    const [curIndex, setCurIndex] = useState(props.selected);

    const handleToggle = (index:number)=>{
        setCurIndex(index)
    }
    const liElm = props.data.map((label,index) => (
    <li 
    className={curIndex === index ? "active":undefined} 
    onClick={()=>{
        handleToggle(index)
        if(props.onClick) props.onClick(index)
    }}>{label}</li>))
    return (<ul className={props.propsClassName} >{liElm}</ul>)
}


export default Menu;