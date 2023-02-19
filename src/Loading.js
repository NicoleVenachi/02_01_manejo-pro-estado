import React from "react";

class Loading extends React.Component {
    UNSAFE_componentWillMount() {
        console.log('componentWillMount');
    }
    
    render() {
        
        return (
            <p> Cargando... </p>
        )
    }
}

export {Loading}