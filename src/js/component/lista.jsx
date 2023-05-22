import React, {useState} from "react";

const Lista = () => {
    const [inputValue, setInputValue ] = useState("");
	const [lista, setLista] = useState ([])
	function handleKeyPress(e){
		if (e.key === "Enter"){
			setLista(lista.concat(inputValue))
		}
	}
	function textoRojo(e) {
		e.target.style.color = 'red';
	  }
	  function textoNormal(e) {
		e.target.style.color = 'white';
	  }
;
    return (
		<div className="container-fluid">
			<div className="tituloPrincipal">
				<h1>Actividades</h1>
			</div>
			<div className="input-group contenidoActividades">
				<ul className="list-group">
					<li className="list-group-item" >
						<input 
							onKeyDown={handleKeyPress}
							type="text"  
							onChange={e=>{setInputValue(e.target.value)}} 
							className="form-control tareaNueva" 
							placeholder="No tasks, add a task" 
							value={inputValue} 
						/>
					</li>
					{lista.map((item, id) => 						
						<li className="list-group-item d-flex justify-content-between align-items-start tareaPorHacer" id={id} key={id} onMouseOver={textoRojo}  onMouseOut={textoNormal}>	
							<span className="textoTarea d-flex justify-content-start text-dark"> {item}</span> 
							<button className="iconoEliminar d-flex justify-content-end" onClick={() => setLista(lista.filter((t, numeroId) => id != numeroId)
								)}>
								x
							</button>		
						</li>
					)}
					<div className="align-items-start tareasFaltantes" >
						{lista.length} item left
					</div>
				</ul>
			</div>
		</div>
	)
}
export default Lista;
