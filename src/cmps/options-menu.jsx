import React from 'react'
import { useParams } from 'react-router-dom'
import {FiMoreHorizontal} from 'react-icons/fi'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'


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
        </Menu>
      </React.Fragment>
    )}
  </PopupState>
}