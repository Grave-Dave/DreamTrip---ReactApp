import React, {useState, useEffect} from 'react';
import useInput from '../hooks/useInput';

const Context = React.createContext();

function userContext(props) {
    
    const [formData, handleChange] = useInput()

    const [tripItems, setTripItems] = useState([])

    const [exploreBtn, setExploreBtn] = useState(false)

    function handleExplore(){
        setExploreBtn(prevExploreBtn=>!prevExploreBtn)
    }

    function addItems(item){
        setTripItems(prevTripItems=>(
            [...prevTripItems, item]
        ))
    }

	return <Context.Provider 
    value={{
        tripItems, 
        exploreBtn,
        formData, 
        addItems,
        handleExplore, 
        handleChange
    }}
        >
        {props.children}
        </Context.Provider>;
}

export { userContext as UserContextProvider, Context };
