import React from "react";
const SECURITY_CODE = 'paradigma';


function UseState(props) {
    // ******Estados independientes
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);

    //almanceno input
    //const [value, setValue] = React.useState('');

    // ******Estados compuestos
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false
    })

    
    console.log(state.value);
    
    React.useEffect(() => {
        console.log('Empezando el efecto');
        
        if(!!state.loading){
            setTimeout(() => {
                console.log('Haciendo validación');
                
                //si valor es correcto, ni error, ni carga
                if (state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        error: false,
                        loading: false
                    })
                } else {
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    })
                }
    
                console.log('Terminando validación');
            }, 2000);
        }

        console.log('Terminando el efecto');
    }, [state.loading])

    return (
        <div>
            <h2> Eliminar {props.name}</h2>

            <p> Porfavor, escribe el código de seguridad</p>

            {(!!state.error && !state.loading)  && (
                <p> Error: El código es incorrecto </p>
            )}

            {(!!state.loading && !state.error) && (
                <p> Cargando... </p>
            )}

            <input 
                placeholder="Código de Seguridad"
                value= {state.value}
                onChange = {(event) =>{
                    // setError(false)
                    setState({
                        ...state,
                        value: event.target.value
                    })
                }}
            />
            <button
                onClick={() => {
                    setState({
                        ...state,
                        loading: true
                    })
                }}
            > Comprobar </button>
        </div>
    );
}

export {UseState}