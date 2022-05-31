import React from 'react'
import { BrowsePreview } from './BrowsePreview.jsx';

export function BrowseDisplay({ tags }) {
    return (
        
        <section className="browse-display" >
            <div className='browse-preview'><h2>Rock</h2>  <div className='img-container'></div></div>
            <div className='browse-preview'><h2>Musicals</h2>  <div className='img-container'></div></div>
            <div className='browse-preview'><h2>New Releases</h2>  <div className='img-container'></div></div>
            <div className='browse-preview'><h2>Israeli</h2>  <div className='img-container'></div></div>
            <div className='browse-preview'><h2>Decades</h2>  <div className='img-container'></div></div>
            <div className='browse-preview'><h2>Heavenly</h2>  <div className='img-container'></div></div>  
        </section>
    )
}

