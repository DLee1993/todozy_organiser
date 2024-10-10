function App() {

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
    }

    return (
        <>
            <header>
                <h1>Todozy</h1>
                <button id="themeToggle" onClick={toggleTheme}></button>
            </header>
            <main>
                input
                <section id="todoList-container">
                    <section id="todoList">list of todos</section>
                    <section>filter buttons and list counter</section>
                </section>
                <span id="user-hint">Drag and drop to re-order the list</span>
            </main>
        </>
    );
}

export default App;
