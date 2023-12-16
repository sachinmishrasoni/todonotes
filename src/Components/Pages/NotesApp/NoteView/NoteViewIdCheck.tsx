import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import NoteView from './NoteView';
import NoteNotFound from './NoteNotFound';

const NoteViewIdCheck = () => {
    const { noteId } = useParams();
    const { state } = useContext(AppDataContext);
    const noteIdArr = state.notesData.map((obj) => obj.id);

    return (
        <>
            {
                noteIdArr.includes(parseInt(noteId as string))
                    ? <NoteView />
                    : <NoteNotFound />
            }
        </>
    )
}

export default NoteViewIdCheck