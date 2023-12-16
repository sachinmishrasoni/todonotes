import React, { createContext, useReducer, useEffect } from 'react';

export type Todo = {
    id: number;
    date: string;
    time: string;
    title: string;
    desc: string;
    isComplete: boolean;
};

export type TodosData = {
    date: string;
    todos: Array<Todo>
}

export type TypeAddNote = {
    id: number;
    userDate: string;
    currDateTime: string;
    heading: string;
    notes: string;
    noteColor: string;
}

type NotesData = Array<TypeAddNote>

export type State = {
    todosData: TodosData[];
    todoUniqueIdCount: number;
    noteUniqueIdCount: number;
    notesData: NotesData;
    myDrawer: {
        isDrawerOpen: boolean;
        mode: string;
    };
    todoDialog: {
        isDialogOpen: boolean;
        forWhom: string;
        dialogData: any;
    };
    todoChip: {
        index: number;
        color: string;
    };
    selectedTodoDate: string;
    appSnackBar: {
        isOpen: boolean;
        severity: string;
        message: string;
    };
    todoOrderSort: {
        order: boolean;
        sort: boolean;
    };
    todoDeleteDialog: {
        isDialogOpen: boolean;
        activeBox: string;
        deleteTodos: string;     // 'one' | 'all'
    };
    noteDialog: {
        isDialogOpen: boolean;
        mode: string;
        data: null | object;
    };
    noteSort: {
        sortName: string;
    };
    noteFilterDialog: {
        isDialogOpen: boolean;
        selectedDate?: string;
        selectedTitle?: string;
    };
    noteLock: {
        isLocked: boolean;
        isLockPageActive: boolean;
        passCode: string;
    };
    updtDelCnfDilg: {
        isDialogOpen: boolean;
        purpose: string;
        noteData: object | number;
    }
};

type TodoShowDialog = {
    isDialogOpen: boolean;
    forWhom: 'showTodoBox' | 'removeTodoBox';
    dialogData?: object
}


type Action =
    | { type: 'ADD_TODO'; payload: any }
    | { type: 'UPDATE_TODO'; payload: any }
    | { type: 'REMOVE_TODO'; payload: any }
    | { type: 'MYDRAWER'; payload: any }
    | { type: 'TODODIALOGHANDL'; payload: TodoShowDialog }
    | { type: 'TODOCHIPCHANGER'; payload: { index: number, color: 'warning' | 'success' | 'error' } }
    | { type: 'SELECTEDTODODATE'; payload: string }
    | { type: 'SNACKBARHANDL'; payload: { isOpen: boolean, severity: 'success' | 'error' | 'info', message: string } }
    | { type: 'TODOORDERSORT'; payload: { order: boolean, sort: boolean } }
    | { type: 'TODODELETEDIALOGHANDL'; payload: { isDialogOpen: boolean, activeBox: 'select' | 'confirm', deleteTodos: 'one' | 'all' } }
    | { type: 'DELETEONETODOS'; payload: string }
    | { type: 'DELETEALLTODOS'; }
    | { type: 'NOTEDIALOGHANDLER'; payload: { isDialogOpen: boolean, mode: 'add' | 'update', data: null | object } }
    | { type: 'ADD_NOTE'; payload: TypeAddNote }
    | { type: 'DELETE_NOTE'; payload: number }
    | { type: 'UPDATE_NOTE'; payload: TypeAddNote }
    | { type: 'NOTE_SORT_HANDLE'; payload: string }
    | { type: 'NOTE_FILTER_DIALOG_HANDLE'; payload: { isDialogOpen: boolean, selectedDate?: string, selectedTitle?: string } }
    | { type: 'NOTE_LOCK_HANDLE'; payload: { isLocked: boolean, isLockPageActive: boolean, passCode: string } }
    | { type: 'UPDTDEL_CNF_DIG_HANDLE'; payload: { isDialogOpen: boolean, purpose: 'update' | 'delete', noteData: object | number } };
;

type Context = {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const loclStrgTodoD: any = localStorage.getItem('TodosData');
const todoUniqCount: any = localStorage.getItem('todoUniqueIdCount');
const loclStrgNoteD: any = localStorage.getItem('NotesData');
const noteUniqCount: any = localStorage.getItem('noteUniqueIdCount');
const noteLockValue: any = localStorage.getItem('noteLockValue');

const appData = {
    todosData: JSON.parse(loclStrgTodoD) || [],
    todoUniqueIdCount: JSON.parse(todoUniqCount) || 1,
    notesData: JSON.parse(loclStrgNoteD) || [],
    noteUniqueIdCount: JSON.parse(noteUniqCount) || 1,
    myDrawer: {
        isDrawerOpen: false,
        mode: 'Add'
    },
    todoDialog: {
        isDialogOpen: false,
        forWhom: 'showTodoBox',
        dialogData: {}
    },
    todoChip: {
        index: 0,
        color: 'warning'
    },
    selectedTodoDate: 'all',
    appSnackBar: {
        isOpen: false,
        severity: 'success',
        message: 'Todo Added.'
    },
    todoOrderSort: {
        order: true,
        sort: true
    },
    todoDeleteDialog: {
        isDialogOpen: false,
        activeBox: 'select',     // select | confirm
        deleteTodos: 'one'      // 'one' | 'all'
    },
    noteDialog: {
        isDialogOpen: false,
        mode: 'add',
        data: null
    },
    noteSort: {
        sortName: 'latest'
    },
    noteFilterDialog: {
        isDialogOpen: false,
        selectedDate: '',
        selectedTitle: ''
    },
    noteLock: JSON.parse(noteLockValue) || {
        isLocked: false,
        isLockPageActive: false,
        passCode: ''
    },
    updtDelCnfDilg: {
        isDialogOpen: false,
        purpose: '',
        noteData: {}
    },
}

const intialState: State = appData;

export const AppDataContext = createContext<Context>({
    state: intialState,
    dispatch: () => { }
});

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'ADD_TODO':
            let allDateArr1 = state.todosData.map((item) => item.date);
            if (!allDateArr1.includes(action.payload.date)) {
                return {
                    ...state, todosData: [...state.todosData, action.payload], todoUniqueIdCount: state.todoUniqueIdCount + 1
                }
            } else {
                return {
                    ...state, todosData: [
                        ...state.todosData.map((obj) => {
                            if (obj.date === action.payload.date) {
                                return { ...obj, todos: [...obj.todos, ...action.payload.todos] }
                            }
                            return obj;
                        })
                    ],
                    todoUniqueIdCount: state.todoUniqueIdCount + 1
                }
            };

        case 'REMOVE_TODO':
            // let myObj = {
            //     ...state, todosData: [
            //         ...state.todosData.map((obj) => {
            //             if (obj.date === action.payload.date) {
            //                 let arr = [...obj.todos];
            //                 arr.splice(action.payload.id, 1)
            //                 return { ...obj, todos: arr }
            //             }
            //             return obj;
            //         })
            //     ]
            // }
            // localStorage.setItem('appData', JSON.stringify(myObj));
            // return myObj;

            return {
                ...state, todosData: state.todosData.map((obj) => {
                    if (obj.date === action.payload.date) {
                        return { ...obj, todos: obj.todos.filter((item) => item.id !== action.payload.id) }
                    }
                    return obj;
                }).filter((filtObj) => filtObj.todos.length >= 1)
            };

        case 'UPDATE_TODO':
            return {
                ...state, todosData: state.todosData.map((obj) => {
                    if (obj.date === action.payload.date) {
                        return {
                            ...obj, todos: obj.todos.map((item) => {
                                if (item.id === action.payload.id) {
                                    return { ...item, ...action.payload.updateTodo }
                                }
                                return item;
                            })
                        }
                    }
                    return obj;
                })
            };

        case 'MYDRAWER':
            return {
                ...state, myDrawer: { ...state.myDrawer, isDrawerOpen: action.payload.isDrawerOpen, mode: action.payload.mode }
            };

        case 'TODODIALOGHANDL':
            return {
                ...state, todoDialog: { ...state.todoDialog, forWhom: action.payload.forWhom, isDialogOpen: action.payload.isDialogOpen, dialogData: action.payload.dialogData }
            };

        case 'TODOCHIPCHANGER':
            return {
                ...state, todoChip: { index: action.payload.index, color: action.payload.color }
            };

        case 'SELECTEDTODODATE':
            return { ...state, selectedTodoDate: action.payload };

        case 'SNACKBARHANDL':
            return {
                ...state,
                appSnackBar: {
                    ...state.appSnackBar,
                    isOpen: action.payload.isOpen,
                    severity: action.payload.severity,
                    message: action.payload.message
                }
            };

        case 'TODOORDERSORT':
            return {
                ...state, todoOrderSort: { ...state.todoOrderSort, order: action.payload.order, sort: action.payload.sort }
            };

        case 'TODODELETEDIALOGHANDL':
            return {
                ...state, todoDeleteDialog: {
                    isDialogOpen: action.payload.isDialogOpen,
                    activeBox: action.payload.activeBox,
                    deleteTodos: action.payload.deleteTodos
                }
            };

        case 'DELETEONETODOS':
            return {
                ...state, todosData: state.todosData.filter((obj) => obj.date !== action.payload)
            };

        case 'DELETEALLTODOS':
            return {
                ...state, todosData: []
            };

        case 'NOTEDIALOGHANDLER':
            return {
                ...state, noteDialog: { isDialogOpen: action.payload.isDialogOpen, mode: action.payload.mode, data: action.payload.data }
            };

        case 'ADD_NOTE':
            let newArr = [action.payload];
            return {
                ...state, notesData: [...state.notesData, ...newArr], noteUniqueIdCount: state.noteUniqueIdCount + 1
            };

        case 'DELETE_NOTE':
            return {
                ...state, notesData: state.notesData.filter((obj) => obj.id !== action.payload)
            };

        case 'UPDATE_NOTE':
            return {
                ...state, notesData: state.notesData.map((obj) => {
                    if (obj.id === action.payload.id) {
                        return {
                            ...obj, ...action.payload
                        }
                    }
                    return obj;
                })
            };

        case 'NOTE_SORT_HANDLE':
            return {
                ...state, noteSort: { sortName: action.payload }
            };

        case 'NOTE_FILTER_DIALOG_HANDLE':
            return {
                ...state, noteFilterDialog: { isDialogOpen: action.payload.isDialogOpen, selectedDate: action.payload.selectedDate, selectedTitle: action.payload.selectedTitle }
            };

        case 'NOTE_LOCK_HANDLE':
            return {
                ...state, noteLock: { isLocked: action.payload.isLocked, isLockPageActive: action.payload.isLockPageActive, passCode: action.payload.passCode }
            };

        case 'UPDTDEL_CNF_DIG_HANDLE':
            return {
                ...state, updtDelCnfDilg: {
                    isDialogOpen: action.payload.isDialogOpen,
                    purpose: action.payload.purpose,
                    noteData: action.payload.noteData
                }
            };

        default:
            return { ...state };
    }
}

const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, intialState);
    // console.log(state.notesData)
    useEffect(() => {
        // Store Todos Date in Local Storage -->>
        localStorage.setItem('TodosData', JSON.stringify(state.todosData));
        // Store all Todo Unique Id
        localStorage.setItem('todoUniqueIdCount', JSON.stringify(state.todoUniqueIdCount));
        // Store Notes Data in Local Storage -->>
        localStorage.setItem('NotesData', JSON.stringify(state.notesData));
        // Store all Note generate Unique Id
        localStorage.setItem('noteUniqueIdCount', JSON.stringify(state.noteUniqueIdCount));
        // Store note lock value
        localStorage.setItem('noteLockValue', JSON.stringify(state.noteLock))
    }, [state])
    return (
        <>
            <AppDataContext.Provider value={{ state, dispatch }}>
                {children}
            </AppDataContext.Provider>
        </>
    )
}

export default AppDataProvider;