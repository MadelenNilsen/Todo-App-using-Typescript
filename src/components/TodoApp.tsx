import { useState } from 'react';

interface TodoItem { // This defines the shape of a todo item using TS. Helps TS check our data and prevent mistakes
  id: string;
  text: string;
  completed: boolean;
}

const TodoApp = () => { // This is a functional component in React. Everything inside here defines how our todo app behaves and renders
  const [todos, setTodos] = useState<TodoItem[]>([]); // tells todo to use the shape of the TodoItem interface array, and to start off as an empty array
  const [newTodo, setNewTodo] = useState(''); // An empty string for the new input field so we can make new tasks

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim() !== '') { // ignore empty input, trim is a JS string method that removes all whitespace from start to end of a string. !== means 'not equal'
      const newId = crypto.randomUUID(); // generates a random id for each new task
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]); // add the new todo to the list
      setNewTodo(''); // Clear the input field after adding a todo
    }
  };

  // Remove a todo
  const removeTodo = (id: string) => { // id is the unique identifier of the todo we want to remove. When we click Remove on a todo, we pass the id to this function.
    const updatedTodos = todos.filter((todo) => todo.id !== id); // filter is a JS array method. It creates a new array containing only the items that meet a condition. Here, we keep the id if its NOT equal to the one we want to remove. 
    setTodos(updatedTodos); // Updates the state of the component with the new array.
  };

  // Toggle completion of a todo
  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => { // map creates a new array by transforming each item in the oroginal array
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }; // flip completed state
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <> {/* Fragment instead of div */}
      <header>
        <h1>Todo App</h1>
      </header>

      <section>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={addTodo}>Add Todo</button>
      </section>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: '0.5rem 0' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
              }}
            >
              {todo.text} {/* display todo text */}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoApp;