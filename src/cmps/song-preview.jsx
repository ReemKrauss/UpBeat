export const SongPreview = ({song}) => {
    return <section className="song-preview flex">
        <div classname="flex">
            <h5>{song.idx}</h5>
            <img src={song.imgUrl} />
            <h4 classname = 'song-title'>{song.title}</h4>
        </div>
    </section>
}