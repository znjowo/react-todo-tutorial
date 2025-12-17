import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TodoGroupDetail } from '../../common/types';
import { getGroup, updateGroup, deleteGroup } from '../../common/api/group';
import { TodoList } from '../todo/TodoList';

export const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<TodoGroupDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  const groupId = Number(id);

  const fetchGroup = async () => {
    const data = await getGroup(groupId);
    setGroup(data);
    setEditName(data.name);
  };

  useEffect(() => {
    fetchGroup();
  }, [groupId]);

  const handleUpdate = async () => {
    if (!editName.trim()) return;
    await updateGroup(groupId, editName.trim());
    setIsEditing(false);
    fetchGroup();
  };

  const handleDelete = async () => {
    if (window.confirm('このグループを削除しますか？')) {
      await deleteGroup(groupId);
      navigate('/groups');
    }
  };

  if (!group) return null;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <IconButton onClick={() => navigate('/groups')}>
          <ArrowBackIcon />
        </IconButton>

        {isEditing ? (
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
            <TextField
              size="small"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button variant="contained" onClick={handleUpdate}>
              保存
            </Button>
            <Button onClick={() => setIsEditing(false)}>
              キャンセル
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              {group.name}
            </Typography>
            <Button onClick={() => setIsEditing(true)}>
              編集
            </Button>
            <Button color="error" onClick={handleDelete}>
              削除
            </Button>
          </>
        )}
      </Box>

      <TodoList groupId={groupId} />
    </Box>
  );
};
