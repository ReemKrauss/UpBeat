import React from 'react'
import { useParams } from 'react-router-dom'
import {FiMoreHorizontal} from 'react-icons/fi'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { WhatsappShareButton, FacebookShareButton } from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoLogoFacebook, IoLogoWhatsapp, IoShareSocialSharp } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";


export const OptionsMenu = ({song, removeSong, removePlaylist}) => {

    const params = useParams()
    const from = params.playlistId !== 'liked' ? 'playlist' : 'liked songs'

    const onRemoveSong = (popupState) => {
        popupState.close()
        removeSong(song)        
    }

    const onRemovePlaylist = (popupState) => {
      popupState.close()
      removePlaylist()
  }
    

    return <PopupState variant="popover" popupId="demo-popup-menu">
    {(popupState) => (
      <React.Fragment>
        <FiMoreHorizontal className="options-btn" {...bindTrigger(popupState)}/>
        <Menu {...bindMenu(popupState)}>
          {removeSong && <MenuItem onClick={() => onRemoveSong(popupState)}>Remove from {from}</MenuItem>}
          {removePlaylist && <MenuItem onClick={() => onRemovePlaylist(popupState)}>Delete playlist</MenuItem>}
          {removePlaylist && <MenuItem onClick={popupState.close}>Copy playlist</MenuItem>}
          {removePlaylist && <MenuItem>
            <div className="share-container">
        {/* <h5 >Share</h5>  */}
            <div className="share-btns-container flex" >
                <div className='share-btns'>
                    <WhatsappShareButton url={`http://localhost:3000/playlist/${params.playlistId}`} title="I like to share with you this playlist from UpBeat!">
                        <RiWhatsappFill />
                    </WhatsappShareButton>
                </div>
                <div className='share-btns'>
                    <FacebookShareButton url={`http://localhost:3000/playlist/${params.playlistId}`} title="I like to share with you this playlist from UpBeat!">
                        <IoLogoFacebook />
                    </FacebookShareButton>
                </div>
                <div className='share-btns'>
                    <CopyToClipboard text={`http://localhost:3000/playlist/${params.playlistId}`}>
                        <IoShareSocialSharp />
                    </CopyToClipboard>
                </div>

            </div>
        </div>
          
          </MenuItem>}
        </Menu>
      </React.Fragment>
    )}
  </PopupState>
}