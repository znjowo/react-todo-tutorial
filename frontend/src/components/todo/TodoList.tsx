import { useState, useEffect } from 'react';
import { List, Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, Badge, SelectChangeEvent } from '@mui/material';
import { Todo, TodoCreateRequest } from '../../common/types';
import { getTodos, createTodo, updateTodo, deleteTodo, getOverdueCount } from '../../common/api/todo';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';

interface Props {
  groupId?: number;
}

export const TodoList = ({ groupId }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState<string>('');
  const [overdueCount, setOverdueCount] = useState(0);

  const fetchTodos = async () => {
    const data = await getTodos(sort || undefined);
    const filtered = groupId !== undefined
      ? data.filter((todo) => todo.group === groupId)
      : data;
    setTodos(filtered);
  };

  const fetchOverdueCount = async () => {
    const count = await getOverdueCount();
    setOverdueCount(count);
  };

  useEffect(() => {
    fetchTodos();
    fetchOverdueCount();
  }, [sort, groupId]);

  const handleCreate = async (data: TodoCreateRequest) => {
    await createTodo(data);
    fetchTodos();
    fetchOverdueCount();
  };

  const handleToggle = async (id: number, checked: boolean) => {
    await updateTodo(id, { checked });
    fetchTodos();
    fetchOverdueCount();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
    fetchOverdueCount();
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSort(e.target.value);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Badge badgeContent={overdueCount} color="error">
          <Typography variant="h6">Todo一覧</Typography>
        </Badge>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>並び順</InputLabel>
          <Select value={sort} label="並び順" onChange={handleSortChange}>
            <MenuItem value="">デフォルト</MenuItem>
            <MenuItem value="deadline">期限</MenuItem>
            <MenuItem value="created_at">作成日</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TodoForm onSubmit={handleCreate} groupId={groupId} />

      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
        {todos.length === 0 && (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            Todoがありません
          </Typography>
        )}
      </List>
    </Paper>
  );
};
