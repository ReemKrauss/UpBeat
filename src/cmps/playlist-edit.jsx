import { ImgUploader } from "./img-uploader"
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { Multiselect } from 'multiselect-react-dropdown'

export const PlaylistEdit = ({ handleChange, onUploaded, editData, toggleEdit, onSaveEdit }) => {




    return <section className="playlist-edit">
        <h3>Edit Details</h3>
        <button className="close-btn" onClick={toggleEdit}><CgClose /></button>
        <div className="img-container flex">
            <ImgUploader onUploaded={onUploaded} display={(editData.imgUrl && <img src={editData.imgUrl} style={{ width: '180px', height: '180px' }} />)
                || <BsMusicNoteBeamed className='new-playlist-icon' />} />
        </div>
        <form onSubmit={onSaveEdit}>
            <input onChange={handleChange} value={editData.name} type="text" name="name" id="name" placeholder="playlist name" />
            {/* <Multiselect className="multiselect"
                isObject={false}
                onKeyPressFn={function noRefCheck() { }}
                onRemove={function noRefCheck() { }}
                onSearch={function noRefCheck() { }}
                onSelect={function noRefCheck() { }}
                options={[
                    'Rock',
                    'Pop',
                    'Metal',
                    'Classic 80s',
                    '20s Pop'
                ]}
                style={{
                    MultiselectContainer: {
                        height:'20px'
                    }
                }}
            /> */}
            {/* <input onChange={handleChange} value={editData.description} type="text" name="description" id="description" placeholder="playlist name" /> */}
            <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} value={editData.description}></textarea>
            <button className='save-btn'>Save</button>
        </form>
    </section>
}