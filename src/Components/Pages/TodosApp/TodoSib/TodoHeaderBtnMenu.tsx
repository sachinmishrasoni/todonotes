import { ArrowDownward, ArrowUpward, ClearAll, Delete, RestartAlt, Search, Sort } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import TodoDeleteDialog from './TodoDeleteDialog';
import FilterTodoDialog from './FilterTodoDialog';

interface ITodoMenu {
    anchorEl: any;
    setAnchorEl: Function;
}
const TodoHeaderBtnMenu = ({ anchorEl, setAnchorEl }: ITodoMenu) => {
    const open = Boolean(anchorEl);
    const { state, dispatch } = useContext(AppDataContext);
    const { order, sort } = state.todoOrderSort;
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    const handleClose = () => {
        setAnchorEl(null);
    };


    const MenuItemHandle = (menuItem: string) => {
        if (menuItem === 'todoFilter') {
            setIsFilterDialogOpen(true);
        } else if (menuItem === 'todoOrder') {
            dispatch({
                type: 'TODOORDERSORT',
                payload: {
                    order: !order,
                    sort: sort
                }
            })
        } else if (menuItem === 'todoSort') {
            dispatch({
                type: 'TODOORDERSORT',
                payload: {
                    order: order,
                    sort: !sort
                }
            })
        } else if (menuItem === 'deleteTodos') {
            dispatch({
                type: 'TODODELETEDIALOGHANDL',
                payload: {
                    isDialogOpen: true,
                    activeBox: 'select',
                    deleteTodos: 'one'
                }
            })

        } else if (menuItem === 'deleteAllTodos') {
            dispatch({
                type: 'TODODELETEDIALOGHANDL',
                payload: {
                    isDialogOpen: true,
                    activeBox: 'confirm',
                    deleteTodos: 'all'
                }
            })

        }
        setAnchorEl(null)
    }
    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => MenuItemHandle('todoFilter')}>
                    <ListItemIcon><Search fontSize='small' /></ListItemIcon>
                    <ListItemText>Filter Todos</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => MenuItemHandle('todoOrder')}>
                    <ListItemIcon>{order ? <ArrowDownward fontSize='small' /> : <ArrowUpward fontSize='small' />}</ListItemIcon>
                    <ListItemText>Todos Order</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => MenuItemHandle('todoSort')}>
                    <ListItemIcon><Sort fontSize='small' /></ListItemIcon>
                    <ListItemText>Sort : <span style={{ color: 'gray' }}>{sort ? 'Latest' : 'Oldest'}</span></ListItemText>
                </MenuItem>
                <MenuItem onClick={() => MenuItemHandle('deleteTodos')}>
                    <ListItemIcon><Delete fontSize='small' /></ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => MenuItemHandle('deleteAllTodos')}>
                    <ListItemIcon><ClearAll fontSize='small' /></ListItemIcon>
                    <ListItemText>Clear All</ListItemText>
                </MenuItem>
                <MenuItem disabled={!order || !sort ? false: true}>
                    <ListItemIcon><RestartAlt fontSize='small' /></ListItemIcon>
                    <ListItemText>Reset</ListItemText>
                </MenuItem>
            </Menu>

            <FilterTodoDialog
                isFilterDialogOpen={isFilterDialogOpen}
                setIsFilterDialogOpen={setIsFilterDialogOpen}
            />
            <TodoDeleteDialog />
        </>
    )
}

export default TodoHeaderBtnMenu;