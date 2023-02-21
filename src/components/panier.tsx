interface Iprops {
    job: number;
     fondClass?: string;
}


const Panier = (props:Iprops) => {
    const job= ["7€","3€","Abonnez-vous !!!"]
return(
    <div className={props.fondClass} >
        <h2>Prix</h2>
        <p>{job[props.job]}</p>
    </div>

)
}

export default Panier;