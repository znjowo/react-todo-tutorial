import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Button,
  Checkbox,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { getToDoList, postCreateTodo, patchCheckTodo, deleteTodo, Todo } from '../../common/api/todo';

const Top: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    getToDoList()
      .then((data: Todo[]) => setTodos(data))
      .catch((error: Error) => console.error('Failed to fetch:', error));
  }, []);

  const handleAddTodo = (): void => {
    if (inputValue.trim() === '') return;

    postCreateTodo(inputValue)
      .then((newTodo: Todo) => {
        setTodos([...todos, newTodo]);
        setInputValue('');
      })
      .catch((error: Error) => console.error('Failed to create:', error));
  };

  const handleToggleTodo = (id: number): void => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    patchCheckTodo(id, !todo.checked)
      .then(() => {
        setTodos(todos.map((t) =>
          t.id === id ? { ...t, checked: !t.checked } : t
        ));
      })
      .catch((error: Error) => console.error('Failed to update:', error));
  };

  const handleDeleteTodo = (id: number): void => {
    deleteTodo(id)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error: Error) => console.error('Failed to delete:', error));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Todo List
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="新しいタスクを入力..."
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') handleAddTodo();
              }}
            />
            <Button variant="contained" onClick={handleAddTodo} sx={{ minWidth: '100px' }}>
              追加
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3}>
          <List>
            {todos.length === 0 ? (
              <ListItem>
                <ListItemText primary="タスクがありません" sx={{ textAlign: 'center', color: 'text.secondary' }} />
              </ListItem>
            ) : (
              todos.map((todo: Todo) => (
                <ListItem
                  key={todo.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDeleteTodo(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Checkbox checked={todo.checked} onChange={() => handleToggleTodo(todo.id)} />
                  <ListItemText
                    primary={todo.name}
                    sx={{
                      textDecoration: todo.checked ? 'line-through' : 'none',
                      color: todo.checked ? 'text.secondary' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Top;
