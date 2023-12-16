import { useState, useContext } from 'react';
import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { AppDataContext, TypeAddNote } from '../../../../AppContext/AppDataProvider';

interface INoteRimCard {
    data: TypeAddNote;
}
const NoteRimCard = ({ data }: INoteRimCard) => {
    const { dispatch } = useContext(AppDataContext);
    const { id, userDate, heading, notes, noteColor } = data;
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMoreBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMoreClose = () => {
        setAnchorEl(null);
    };

    const CardHandler = (id: number) => {
        navigate(`/todonotes/notes/${id}`)
    }

    const MenuHandle = (value: string) => {
        if (value === 'edit') {
            dispatch({
                type: 'NOTEDIALOGHANDLER',
                payload: {
                    isDialogOpen: true,
                    mode: 'update',
                    data: {
                        id: id,
                        date: userDate
                    }
                }
            })
        } else if (value === 'delete') {
            dispatch({
                type: 'UPDTDEL_CNF_DIG_HANDLE',
                payload: {
                    isDialogOpen: true,
                    purpose: 'delete',
                    noteData: id
                }
            });
            
        }
        setAnchorEl(null)
    }
    return (
        <>
            <Paper className='note-rim-card' sx={{
                p: 0.5,
                pl: 0,
                borderRadius: '5px',
                borderLeft: '5px solid',
                borderColor: noteColor.trim() !== ''? noteColor: 'myThemeColors.highlight',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '3px 3px 5px rgba(0,0,0,0.2), -3px -3px 5px rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in',
                '&:hover': {
                    transform: 'scale(1.005)',
                    transition: 'all 0.2s ease-in'
                }
            }}>
                <Stack px={2} py={0.5} alignItems={'center'} justifyContent={'center'} sx={{ '& .MuiTypography-root': { lineHeight: 1.3 } }}>
                    <Typography className='month' variant='caption' color={'gray'} fontWeight={'bold'}>{userDate.slice(2, 6)}</Typography>
                    <Typography className='date' variant='body2' fontWeight={'bold'}>{userDate.slice(0, 2)}</Typography>
                    <Typography className='year' variant='caption' color={'gray'} fontWeight={'bold'} fontSize={'0.55rem'}>{userDate.slice(6)}</Typography>
                </Stack>
                <Stack flexGrow={1} onClick={() => CardHandler(id)}>
                    <Typography className='heading' variant='body1' fontWeight={'bold'}>{heading}</Typography>
                    <Typography variant='caption' color={'gray'} sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textTransform: 'capitalize'

                    }}>{notes}</Typography>
                </Stack>
                <Stack>
                    <Tooltip title=''>
                        <IconButton size='small' onClick={handleMoreBtn}>
                            <MoreVert fontSize='small' />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Menu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleMoreClose}
                >
                    <MenuItem onClick={() => MenuHandle('edit')}>
                        <ListItemIcon><Edit fontSize='small' /></ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => MenuHandle('delete')}>
                        <ListItemIcon><Delete fontSize='small' color='error' /></ListItemIcon>
                        <ListItemText >Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </Paper>
        </>
    )
}

export default NoteRimCard