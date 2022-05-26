import { ImgUploader } from "./img-uploader"

export const PlaylistEdit = ({ handleChange, onUploaded, editData}) => {
    const onSaveEdit = async (ev) => {
        console.log('hello')
    }

    
    return <section className="playlist-edit">
        <h3>Edit Details</h3>
        <button>X</button>
        <div className="img-container flex">
            <ImgUploader onUploaded={onUploaded} />
        </div>
        <form onSubmit={onSaveEdit}>
            <input onChange={handleChange} value={editData.name} type="text" name="name" id="name" placeholder="playlist name" />
            <input onChange={handleChange} value={editData.description} type="text" name="description" id="description" placeholder="playlist name" />
            <button className='save-button'>Save</button>
        </form>
    </section>
}