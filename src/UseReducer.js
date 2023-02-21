
import React from "react";
const SECURITY_CODE = 'paradigma';

//estado compeusto
const initialState = {
    value: '',
    error: false,
    loading: false,

    deleted: false,
    confimed: false
}

function UseReducer(props) {
    
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirm = () =>  dispatch({type: actionTypes.confirm})

    const onError = () =>  dispatch({type: actionTypes.error})

    const onWrite = (event) =>{
        dispatch({ type: actionTypes.write, payload: event.target.value})
    }

    const onCheck = () =>  dispatch({type: actionTypes.check})

    const onDelete = () =>  dispatch({type: actionTypes.delete})

    const onReset = () =>  dispatch({type: actionTypes.reset})


    console.log(state.value);

    React.useEffect(() => {
        console.log('Empezando el efecto');
        console.log(state.loading);
        
        if(!!state.loading){
            setTimeout(() => {
                console.log('Haciendo validación');
                
                //si valor es correcto, ni error, ni carga
                if (state.value === SECURITY_CODE) {
                    //voy a screen de confirmacion
                    onConfirm()
                } else {
                    //Acctivo p de error
                    onError()
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
                    onChange = {onWrite}
                />
                <button
                    //validar si el input es correcto
                    onClick={onCheck}
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
                    //voy a delete screen
                    onClick={onDelete}
                > Sí, elinimar </button>

                <button
                    //vulevo a overview
                    onClick={ onReset}
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
                    //vulevo a overview
                    onClick={ onReset}
                > Reseeat, colver atrás </button>
                
            </React.Fragment>
        )
    }
    
}

export {UseReducer}

//3ra forma
const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        
        //paso el etadod e confirma
        confimed: true
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },

    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },

    [actionTypes.check]: {
        ...state,
        loading: true
    },

    [actionTypes.delete]: {
        ...state,
        //paso a delete screen
        deleted: true
    },

    [actionTypes.reset] : {
        ...state,

        //vuelvo a overviwe screen
        confimed: false,
        deleted: false,
        value:''
    }
})

const reducer = (state, action) =>{
    if (reducerObject(state)[action.type]) {
        
        return reducerObject(state,action.payload)[action.type];
    }
    else {
        return state
    }
}

const actionTypes = {
    confirm: 'CONFIRM',
    write: 'WRITE',
    error: 'ERROR',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',

}

// ********************************************************
// reducers
// const reducer = (state, action) => {
    
// }

//1ra forma

// const reducer = (state, action) => {
    
//     if (action.type === 'ERROR') {
//         //devuelvo neuvo estad
//         return {
//             ...state,
//             error: true,
//             loading: false
//         }   
//     } 
//     else if (action.type === 'CHECK'){
//         return {
//             ...state,
//             loading: true
//         }   
//     }
//     else {
//         return{
//             ...state
//         }
        
//     }
// }

// //2da forma
// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error: true,
//                 loading: false
//             } 
            
//         case 'CHECK':
//             return {
//                 ...state,
//                 loading: true
//             } 

//         default:
//             return {
//                 ...state
//             } 
//     }
// }



