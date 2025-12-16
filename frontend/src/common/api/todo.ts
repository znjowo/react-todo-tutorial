export type Todo = {
  id: number;
  name: string;
  checked: boolean;
};

const originURL: URL = new URL("http://localhost:8000/api/todo/");

const getToDoList = (): Promise<Todo[]> => {
  const url = new URL(`/api/todo/`, originURL);
  return new Promise((resolve, reject) => {
    fetch(url.href)
      .then((res) => res.json())
      .then((json: Todo[]) => resolve(json))
      .catch((error: Error) => reject(error));
  });
};

const postCreateTodo = (name: string): Promise<Todo> => {
  const url = new URL(`/api/todo/`, originURL);
  return new Promise((resolve, reject) => {
    fetch(url.href, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((json: Todo) => resolve(json))
      .catch((error: Error) => reject(error));
  });
};

const patchCheckTodo = (id: number, checked: boolean): Promise<void> => {
  const url = new URL(`/api/todo/${id}/`, originURL);
  return new Promise((resolve, reject) => {
    fetch(url.href, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checked: checked,
      }),
    })
      .then(() => resolve())
      .catch((error: Error) => reject(error));
  });
};

const deleteTodo = (id: number): Promise<void> => {
  const url = new URL(`/api/todo/${id}/`, originURL);
  return new Promise((resolve, reject) => {
    fetch(url.href, {
      method: "DELETE",
    })
      .then(() => resolve())
      .catch((error: Error) => reject(error));
  });
};

export { getToDoList, postCreateTodo, patchCheckTodo, deleteTodo };
