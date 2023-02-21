import React from "react";
const SECURITY_CODE = 'paradigma';


function UseState(props) {
    // ******Estados independientes
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);

    //almanceno input
    //const [value, setValue] = React.useState('');

    // ********* 

    // ******Estados compuestos
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,

        deleted: false,
        confimed: false
    })

    
    console.log(state.value);
    
    const onConfirm = () =>{
        setState({
            ...state,
            error: false,
            loading: false,
            
            //paso el etadod e confirma
            confimed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onWrite = (newValue) =>{
        setState({
            ...state,
            value: newValue
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,

            //paso a delete screen
            deleted: true

        })
    }

    const onReset = () => {
        setState({
            ...state,

            //vuelvo a overviwe screen
            confimed: false,
            deleted: false,
            value:''
        })
    }
    React.useEffect(() => {
        console.log('Empezando el efecto');
        console.log(state.loading);
        
        if(!!state.loading){
            setTimeout(() => {
                console.log('Haciendo validación');
                
                //si valor es correcto, ni error, ni carga
                if (state.value === SECURITY_CODE) {
                    //voy a screen de confirmacion
                    onConfirm();
                } else {
                    //Acctivo p de error
                    onError();
                }
    
                console.log('Terminando validación');
            }, 2000);
        }

        console.log('Terminando el efecto');
    }, [state.loading])

    //overview screen
    if(!state.deleted && !state.confimed) {
        return (
            <div>
                <h2> Eliminar {props.name}</h2>
    
                <p> Porfavor, escribe el código de seguridad</p>
    
                {(!!state.error && !state.loading)  && (
                    <p> Error: El código es incorrecto </p>
                )}
    
                {(!!state.loading ) && (
                    <p> Cargando... </p>
                )}
    
                <input 
                    placeholder="Código de Seguridad"
                    value= {state.value}
                    onChange = {(event) =>{
                        //aleo el input
                        onWrite(event.target.value);
                        
                    }}
                />
                <button
                    onClick={() => {
                        //validar si el input es correcto
                        onCheck();
                    }}
                > Comprobar </button>
            </div>
        );
    }

    //cocnfirmed screen
    else if(!state.deleted && state.confimed){
        return (
            <React.Fragment>
                <h2> Eliminar {props.name}</h2>

                <p> Predimos confirmación, estás segur@? </p>

                <button
                    onClick={() =>{
                        //voy a delete screen
                        onDelete()
                    }}
                > Sí, elinimar </button>

                <button
                    onClick={() =>{
                        //vuelvo a overview
                        onReset();
                    }}
                > No, me arrepentí </button>
            </React.Fragment>
        )
    }

    //delete screen
    else{
        return (
            <React.Fragment>
                <h2> Eliminar {props.name}</h2>

                <button
                    onClick={() =>{
                        //vulevo a overview
                        onReset();
                    }}
                > Reseeat, colver atrás </button>
                
            </React.Fragment>
        )
    }
    
}

export {UseState}