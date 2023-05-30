import React, {useState, useEffect} from "react";

const ToDoList = () => {
    const [inputValue, setInputValue ] = useState("");
	const [lista, setLista] = useState ([])
	function handleKeyPress(e){
		if (e.key === "Enter" && inputValue.trim() !== "") {
			agregarLista(inputValue.trim());
			setInputValue("");
		  }
		}
	function textoRojo(e) {
		e.target.style.color = 'red';
	  }
	  function textoNormal(e) {
		e.target.style.color = 'white';
	  };
	  
	  function traerTarea(){
		fetch ('https://assets.breatheco.de/apis/fake/todos/user/StalinNarvaez')		
		.then ( (response) => response.json())
		.then ((data)=> setLista(data))
	}
	const agregarLista = (label) => {
		const nuevaLista = [...lista, { label, done: false }];
		setLista(nuevaLista);
		guardarLista(nuevaLista);
	  };
	  const guardarLista = (lista) => {
		fetch
		(('https://assets.breatheco.de/apis/fake/todos/user/StalinNarvaez'), {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(lista),
		})
		  .then((r) => r.json())
		  .then((data) => console.log("Guardar lista:", data))
		  .catch((error) => console.error("Error al guardar lista:", error));
	  };

	  const eliminarTarea = (id) => {
		const  listaActualizada = lista.filter((_, i) => i !== id);
		setLista( listaActualizada);
		guardarLista( listaActualizada);
	  };

	  const limpiarLista = () => {
	 	fetch
	 	(('https://assets.breatheco.de/apis/fake/todos/user/StalinNarvaez'),{ 
	 		method: "PUT"
		})
	 	  .then(() => setLista([]))
	 	  .catch((error) => console.error("Error al limpiar la lista:", error));
	   };

useEffect( ()=>{traerTarea()},[]);
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
							<span className="textoTarea d-flex justify-content-start text-dark"> {item.label}</span> 
							<button className="iconoEliminar d-flex justify-content-end" onClick={() => eliminarTarea(id)}>
								x
							</button>		
						</li>
					)}
					<div className="align-items-start tareasFaltantes" >
						{lista.length} item left
					</div>
				</ul>
			</div>
            <div className="d-flex justify-content-center botonesAuxiliares">
                <button type="button" className="btn btn-info traerTarea" onClick={traerTarea}>Traer Lista</button>
                <button type="button" className="btn btn-danger eliminarTarea" onClick={limpiarLista}>Eliminar Lista</button>
            </div>
		</div>
	)
}
export default ToDoList;
