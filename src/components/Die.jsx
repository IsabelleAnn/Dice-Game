export default function Die(props){

    return(
    <div 
        onClick={()=>props.handleDieClick(props.id)} 
        style={props.isLocked ? {backgroundColor: "#59E391"} : {}} 
        className="die">{props.value}
    </div>)
}