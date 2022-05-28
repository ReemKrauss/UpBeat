import { ImgUploader } from "./img-uploader"
import { BsMusicNoteBeamed } from 'react-icons/bs'
import {CgClose} from 'react-icons/cg'

export const PlaylistEdit = ({ handleChange, onUploaded, editData,toggleEdit, onSaveEdit}) => {
    
    

    
    return <section className="playlist-edit">
        <h3>Edit Details</h3>
        <button className="close-btn" onClick={toggleEdit}><CgClose /></button>
        <div className="img-container flex">
            <ImgUploader onUploaded={onUploaded} display={(editData.imgUrl && <img src={editData.imgUrl} style={{width: '180px',height: '180px'}}/>)
             || <BsMusicNoteBeamed className='new-playlist-icon'/>} />
        </div>
        <form onSubmit={onSaveEdit}>
            <input onChange={handleChange} value={editData.name} type="text" name="name" id="name" placeholder="playlist name" />
            {/* <input onChange={handleChange} value={editData.description} type="text" name="description" id="description" placeholder="playlist name" /> */}
            <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} value={editData.description}></textarea>
            <button className='save-btn'>Save</button>
        </form>
    </section>
}