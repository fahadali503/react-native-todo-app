import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Todo {
    id: string,
    title: string,
    description: string,
    isCompleted: boolean
}

export interface TodosState {
    todos: Todo[]
}
const initialState: TodosState = {
    todos: []
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Todo>) {
            state.todos.push(action.payload);
        },
        removeTodo(state, action: PayloadAction<string>) {
            const todos = state.todos.filter(todo => todo.id !== action.payload);
            state.todos = todos;
        },
        completeTodo(state, action: PayloadAction<string>) {
            const todos = state.todos.map(todo => todo.id === action.payload ? { ...todo, isCompleted: true } : todo);
            state.todos = todos;
        }
    }
})
export const { addTodo, removeTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;