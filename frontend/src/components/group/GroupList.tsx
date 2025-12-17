import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, List, ListItem, ListItemText, ListItemButton, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoGroup } from '../../common/types';
import { getGroups, createGroup, deleteGroup } from '../../common/api/group';

export const GroupList = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchGroups = async () => {
    const data = await getGroups();
    setGroups(data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await createGroup(name.trim());
      setName('');
      fetchGroups();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteGroup(id);
    fetchGroups();
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        グループ一覧
      </Typography>

      <Box component="form" onSubmit={handleCreate} sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="グループ名"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting || !name.trim()}>
          作成
        </Button>
      </Box>

      <List>
        {groups.map((group) => (
          <ListItem
            key={group.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(group.id)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton component={Link} to={`/groups/${group.id}`}>
              <ListItemText primary={group.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {groups.length === 0 && (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            グループがありません
          </Typography>
        )}
      </List>
    </Paper>
  );
};
