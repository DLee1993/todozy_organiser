import { FormEvent, useEffect, useState } from "react";

type Todo = {
    checked: boolean;
    content: string;
    id: number;
};

function App() {
    const [filter, setFilter] = useState("all");
    const [todo, settodo] = useState("");
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const allTodos = localStorage.getItem("todo-list");

    useEffect(() => {
        const refList = allTodos ? JSON.parse(allTodos) : [];

        if (filter === "all" || filter === "") {
            if (allTodos) {
                setTodoList(JSON.parse(allTodos));
            } else {
                setTodoList([]);
            }
        }

        if (filter === "active") {
            const activeTodos = refList.filter((todo: Todo) => todo.checked === false);

            if (activeTodos) {
                setTodoList(activeTodos);
            } else {
                setTodoList([]);
            }
        }

        if (filter === "completed") {
            const completedTodos = refList.filter((todo: Todo) => todo.checked === true);

            if (completedTodos) {
                setTodoList(completedTodos);
            } else {
                setTodoList([]);
            }
        }
    }, [filter, allTodos]);

    const DeleteButton = ({ data }: { data: number }) => {
        return (
            <button id="deleteButton" onClick={() => deleteTodo(data)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M4 7H20"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                        <path
                            d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                        <path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                    </g>
                </svg>
            </button>
        );
    };

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
    }

    function addTodo(e: FormEvent) {
        e.preventDefault();

        settodo("");
        const updatedState = [
            ...todoList,
            { checked: false, content: todo, id: todoList.length + 1 },
        ];

        if (!updatedState) return;

        setTodoList(updatedState);
        localStorage.setItem("todo-list", JSON.stringify(updatedState));
    }

    function updateTodo(data: Todo) {
        const updatedTodos = todoList.map((todo: Todo) =>
            todo.id === data.id ? { ...todo, checked: data.checked } : todo
        );

        localStorage.setItem("todo-list", JSON.stringify(updatedTodos));

        const updatedList = localStorage.getItem("todo-list");

        if (updatedList) {
            setTodoList(JSON.parse(updatedList));
        } else {
            setTodoList([]);
        }
    }

    function deleteTodo(data: number) {
        const updatedTodos = todoList.filter((todo: Todo) => todo.id !== data);
        setTodoList(updatedTodos);
        localStorage.setItem("todo-list", JSON.stringify(updatedTodos));
    }

    function clearCompleted() {
        const updatedTodos = todoList.filter((todo: Todo) => todo.checked === false);
        setTodoList(updatedTodos);
        localStorage.setItem("todo-list", JSON.stringify(updatedTodos));
    }

    return (
        <>
            <header>
                <h1>Todozy</h1>
                <button id="themeToggle" onClick={toggleTheme}></button>
            </header>
            <main>
                <form onSubmit={addTodo}>
                    <fieldset>
                        <label htmlFor="todo">create a new todo</label>
                        <input
                            type="text"
                            id="todo"
                            placeholder="Create a new todo..."
                            value={todo}
                            onChange={(e) => settodo(e.target.value)}
                            autoFocus
                        />
                    </fieldset>
                </form>
                <section id="todoList-container">
                    <section id="todoList">
                        <ul>
                            {todoList.map((todo: Todo, index: number) => (
                                <li key={index}>
                                    <span id="checkbox">
                                        <input
                                            id={`todo-${index}`}
                                            readOnly
                                            type="checkbox"
                                            checked={todo.checked}
                                            onClick={() =>
                                                updateTodo({
                                                    checked: !todo.checked,
                                                    content: todo.content,
                                                    id: todo.id,
                                                })
                                            }
                                        />
                                        <p>{todo.content}</p>
                                    </span>
                                    <DeleteButton data={todo.id} />
                                </li>
                            ))}
                        </ul>
                    </section>
                    {todoList.length !== 0 && (
                        <>
                            <section id="filter">
                                <p>
                                    {todoList.length}{" "}
                                    <span>{todoList.length > 1 ? "items" : "item"} left</span>
                                </p>
                                <ul>
                                    <li>
                                        <button
                                            onClick={() => setFilter("all")}
                                            className={filter === "all" ? "active" : ""}
                                        >
                                            All
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setFilter("active")}
                                            className={filter === "active" ? "active" : ""}
                                        >
                                            Active
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setFilter("completed")}
                                            className={filter === "completed" ? "active" : ""}
                                        >
                                            Completed
                                        </button>
                                    </li>
                                </ul>
                                {todoList.filter((item) => item.checked === true).length > 0 && (
                                    <button onClick={clearCompleted}>Clear completed</button>
                                )}
                            </section>
                            <p id="user-hint">Drag and drop to re-order the list</p>
                        </>
                    )}
                </section>
            </main>
        </>
    );
}

export default App;
