import React, {useState} from "react";

const Lista = () => {
    const [inputValue, setInputValue ] = useState("");
	const [tarea, setTarea] = useState ([])
	function handleKeyPress(e){
		if (e.key === "Enter"){
			setTarea(tarea.concat(inputValue))
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
							onKeyPress={handleKeyPress}
							type="text"  
							onChange={e=>{setInputValue(e.target.value)}} 
							className="form-control tareaNueva" 
							placeholder="Ingrese aquí su tarea" 
							value={inputValue} 
						/>
					</li>
					{tarea.map((item, id) => 						
							<li className="list-group-item d-flex justify-content-between align-items-start tareaPorHacer" id={id} key={id} onMouseOver={textoRojo}  onMouseOut={textoNormal}>	
									<span className="textoTarea d-flex justify-content-start text-dark"> {item}</span> 
									<button className="iconoEliminar d-flex justify-content-end" onClick={() => setTarea(tarea.filter((t, numeroId) => id != numeroId)
										)}>
										x
									</button>		
							</li>
					)}
					<li className="list-group-item tareasFaltantes" >
						{tarea.length} item left
					</li>
				</ul>
			</div>

		</div>
	)
}
export default Lista;
