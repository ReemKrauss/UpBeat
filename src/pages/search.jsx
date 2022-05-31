import { SearchBar } from "../cmps/search-bar"
import {BrowseDisplay} from "../cmps/browse-display.jsx"




export const Search = () => {
    

    return <section className="search main-layout">
        <SearchBar>
            <h2>Songs</h2>
        </SearchBar>
        {/* <h2>Browse all</h2>
        <BrowseDisplay /> */}
        
    </section>
}