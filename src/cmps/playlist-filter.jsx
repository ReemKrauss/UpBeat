import React, { useMemo } from 'react'
import { useFormRegister } from '../hooks/useFormRegister'

export const PlayListFilter = React.memo((props) => {
    // useMemo()
    const [register] = useFormRegister({
        name: '',
        order: 'date',
    }, props.onChangeFilter)

    const sectionProps = { className: "playlist-filter" }
    return (
        <section {...sectionProps}>
            <section >
                <label htmlFor="name">Name</label>
                <input {...register('name')} />
            </section>
            <section>
                <select {...register('order')}>
                    <option value="date">Date Added</option>
                    <option value="title">Title</option>
                </select>
            </section>
        </section>
    )
}
)