import { useContext } from "react"
import NotesApp from "../NotesApp"
import PassCodeBox from "./PassCodeBox"
import { AppDataContext } from "../../../../AppContext/AppDataProvider"

const ProtectedNotesApp = () => {
    const { state } = useContext(AppDataContext);
    return (
        <>
            {
                state.noteLock.isLockPageActive
                    ? <PassCodeBox />
                    : <NotesApp />
            }
        </>
    )
}

export default ProtectedNotesApp