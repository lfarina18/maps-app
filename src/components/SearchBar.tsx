import { ChangeEvent, useRef } from "react";




export const SearchBar = () => {


    const debounceRef = useRef<NodeJS.Timeout>()

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current)
            clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            console.log('debounce value:', event.target.value)
        }, 500)

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
