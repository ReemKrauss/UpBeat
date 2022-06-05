import React, { useMemo } from 'react'
import { useFormRegister } from '../hooks/useFormRegister'
import { FiSearch } from 'react-icons/fi'

export const PlaylistFilter = React.memo(({onChangeFilter, filterBy}) => {
    // useMemo()
    const [register] = useFormRegister({
        title: filterBy.title,
        order: filterBy.order,
    }, onChangeFilter)

    const checkSelected = (value) => {
        if (filterBy.order === value) return 'selected'
    }

    const sectionProps = { className: "playlist-filter flex" }

    return (
        <section {...sectionProps}>
            <div className="filter-container flex">
                <input className="hidden" type="checkbox" id="toggle" />
                <label htmlFor="toggle"><FiSearch className="search-label" /></label>
                <input autoFocus={true} className="filter-name hidden" {...register('title')} />
            </div>
            <div>
                <select {...register('order')} value={filterBy.order}>
                    <option value="custom" {...checkSelected()}>Custom order</option>
                    <option value="addedAt">Date added</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </section>
    )
}
)