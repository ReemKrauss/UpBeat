import React, { useMemo } from 'react'
import { useFormRegister } from '../hooks/useFormRegister'
import { FiSearch } from 'react-icons/fi'

export const PlaylistFilter = React.memo(({onChangeFilter, filterBy}) => {
    // useMemo()
    const [register] = useFormRegister({
        title: filterBy.title,
        order: filterBy.order,
    }, onChangeFilter)

    const sectionProps = { className: "playlist-filter flex" }
    return (
        <section {...sectionProps}>
            <div className="filter-container flex">
                <label htmlFor="toggle"><FiSearch className="search-label" /></label>
                <input className="hidden" type="checkbox" id="toggle" />
                <input autoFocus={true} className="filter-name hidden" {...register('title')} />
            </div>
            <div>
                <select {...register('order')}>
                    <option value="addedAt">Date added</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </section>
    )
}
)