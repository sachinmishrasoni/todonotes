import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppDataContext } from '../../../../AppContext/AppDataProvider';
import NoteView from './NoteView';
import NoteNotFound from './NoteNotFound';

const NoteViewIdCheck = () => {
    const { noteId } = useParams();
    const { state } = useContext(AppDataContext);
    const noteIdArr = state.notesData.map((obj) => obj.id);
    console.log(noteIdArr.includes(17))
    return (
        <>
            {
                noteIdArr.includes(parseInt(noteId))
                    ? <NoteView />
                    : <NoteNotFound />
            }
        </>
    )
}

export default NoteViewIdCheck