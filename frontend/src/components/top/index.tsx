import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, TextField, Button, List, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TodoGroup, Todo, TodoCreateRequest } from '../../common/types';
import { getGroups, createGroup } from '../../common/api/group';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../common/api/todo';
import { TodoForm } from '../todo/TodoForm';
import { TodoItem } from '../todo/TodoItem';

const Top = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [groupName, setGroupName] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const fetchData = async () => {
    const [groupsData, todosData] = await Promise.all([
      getGroups(),
      getTodos(),
    ]);
    setGroups(groupsData);
    setTodos(todosData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    setIsCreatingGroup(true);
    try {
      await createGroup(groupName.trim());
      setGroupName('');
      fetchData();
    } finally {
      setIsCreatingGroup(false);
    }
  };

  const handleCreateTodo = async (data: TodoCreateRequest) => {
    await createTodo(data);
    fetchData();
  };

  const handleToggle = async (id: number, checked: boolean) => {
    await updateTodo(id, { checked });
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchData();
  };

  const ungroupedTodos = todos.filter((todo) => todo.group === null);
  const getTodosByGroup = (groupId: number) => todos.filter((todo) => todo.group === groupId);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo App
        </Typography>

        {/* グループ作成フォーム */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            新しいグループを作成
          </Typography>
          <Box component="form" onSubmit={handleCreateGroup} sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="グループ名"
              size="small"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button type="submit" variant="contained" disabled={isCreatingGroup || !groupName.trim()}>
              作成
            </Button>
          </Box>
        </Paper>

        {/* グループなしのTodo */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              未分類 ({ungroupedTodos.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TodoForm onSubmit={(data) => handleCreateTodo({ ...data, group: undefined })} />
            <List>
              {ungroupedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
              {ungroupedTodos.length === 0 && (
                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 1 }}>
                  Todoがありません
                </Typography>
              )}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* 各グループのTodo */}
        {groups.map((group) => {
          const groupTodos = getTodosByGroup(group.id);
          return (
            <Accordion key={group.id} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  {group.name} ({groupTodos.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TodoForm onSubmit={(data) => handleCreateTodo({ ...data, group: group.id })} groupId={group.id} />
                <List>
                  {groupTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                  {groupTodos.length === 0 && (
                    <Typography color="text.secondary" sx={{ textAlign: 'center', py: 1 }}>
                      Todoがありません
                    </Typography>
                  )}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Container>
  );
};

export default Top;
