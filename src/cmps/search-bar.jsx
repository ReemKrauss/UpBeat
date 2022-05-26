export const SearchBar = ({params, onHandleChange}) => {
    return <section className="search-bar">
        <input type="text" value={params} placeholder="Search" onChange={onHandleChange} />
    </section>
}