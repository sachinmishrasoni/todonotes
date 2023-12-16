import { Container } from "@mui/material";
import NoteDialog from "./NotesAppSibls/NoteDialog";
import NoteSection from "./NotesAppSibls/NoteSection";
import { useContext } from "react";
import { AppDataContext } from "../../../AppContext/AppDataProvider";
import EmptyNoteBox from "./NotesAppSibls/EmptyNoteBox";


const NotesApp = () => {
    const { state } = useContext(AppDataContext);
    return (
        <>
            <Container
                className="notes-app-box"
                disableGutters
            >
                {
                    state.notesData.length === 0
                        ? <EmptyNoteBox />
                        : <NoteSection />
                }


                {/* Note Add Dialog */}
                <NoteDialog />
            </Container>
        </>
    )
}

export default NotesApp;