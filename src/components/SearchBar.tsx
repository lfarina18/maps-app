import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context';




export const SearchBar = () => {

    const {searchPlacesByTerm} = useContext(PlacesContext);


    const debounceRef = useRef<NodeJS.Timeout>()

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current)
            clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            // console.log('debounce value:', event.target.value)
            searchPlacesByTerm(event.target.value)
        }, 1000)

    }

    return (
        <div className="search-container">
            <input
                onChange={onQueryChanged}
                type="text"
                placeholder="Buscar Lugar"
                className="form-control" />
        </div>
    );
};
