import { useData } from "./api.ts";

export function Component() {
  const { data: allTodos } = useData("todos");
  const { data: oneTodo } = useData("todo", { id: "42" });
  const { data: activeTodos } = useData("todosByStatus", { completed: false });
  const { data: topTodos } = useData("todosOData", {
    $filter: "completed eq false",
    $orderby: "createdAt desc",
    $top: 10,
  });

  return (
    <div>
      <section>
        <h2>All todos</h2>
        <p>{allTodos?.length} todos total</p>
      </section>

      <section>
        <h2>Single todo (by id)</h2>
        <p>{oneTodo?.title}</p>
      </section>

      <section>
        <h2>Active todos (filtered)</h2>
        <p>{activeTodos?.length} active</p>
      </section>

      <section>
        <h2>Top todos (OData)</h2>
        <ul>
          {topTodos?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
