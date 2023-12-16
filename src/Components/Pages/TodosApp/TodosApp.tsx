import { useContext } from 'react';
import { Container } from "@mui/material";
import DataNotFound from "./TodoSib/DataNotFound";
import TodoSection from "./TodoSib/TodoSection";
import { AppDataContext } from '../../../AppContext/AppDataProvider';
import TodoDrawer from './TodoSib/TodoDrawer';
import TodoDialog from './TodoSib/TodoDialog';


const TodosApp = () => {
    const { state } = useContext(AppDataContext);
    console.log()
    return (
        <>
            <Container
                className="todos-app-box"
                disableGutters
                sx={{
                    // minHeight: 'calc(100vh - 56px - 60px )',
                    // overflow: 'hidden'
                }}
            >
                {
                    state.todosData.length >= 1
                        // true
                        ? (
                            <TodoSection />
                        )
                        : (
                            <DataNotFound />
                        )
                }

                {/* Drawer */}
                <TodoDrawer />
                {/* Dialog */}
                {state.todoDialog.isDialogOpen && (<TodoDialog />)}

            </Container>
        </>
    )
}

export default TodosApp;