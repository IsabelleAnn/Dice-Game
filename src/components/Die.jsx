import Dot from "./Dot.jsx"
export default function Die(props){
        let dotElements = [];
        for(let i=1; i<=props.value; i++){
            dotElements.push(<Dot value={props.value}/>)
        }

    return(
    <div 
        onClick={()=>props.handleDieClick(props.id)} 
        style={props.isLocked ? {backgroundColor: "#59E391"} : {}} 
        className="die">{dotElements}
    </div>)
}