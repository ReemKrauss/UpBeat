import React, { useMemo } from 'react'
import { useFormRegister } from '../hooks/useFormRegister'
import { FiSearch } from 'react-icons/fi'

export const PlayListFilter = React.memo((props) => {
    // useMemo()
    const [register] = useFormRegister({
        name: '',
        order: 'date',
    }, props.onChangeFilter)

    const sectionProps = { className: "playlist-filter flex" }
    return (
        <section {...sectionProps}>
            <div className='filter-container flex'>
                <label htmlFor="toggle"><FiSearch className='search-label' /></label>
                <input className="hidden" type="checkbox" id="toggle" />
                <input autoFocus={true} className='filter-name hidden' {...register('name')} />
            </div>
            <div>
                <select {...register('order')}>
                    <option value="date">Date added</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </section>
    )
}
)