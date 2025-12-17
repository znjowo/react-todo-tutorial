import { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { TodoCreateRequest, TodoGroup } from '../../common/types';
import { getGroups } from '../../common/api/group';

interface Props {
  onSubmit: (data: TodoCreateRequest) => Promise<void>;
  groupId?: number;
}

export const TodoForm = ({ onSubmit, groupId }: Props) => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<number | ''>('');
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (groupId === undefined) {
      getGroups().then(setGroups);
    }
  }, [groupId]);

  const handleGroupChange = (e: SelectChangeEvent<number | ''>) => {
    setSelectedGroup(e.target.value as number | '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        deadline: deadline || undefined,
        group: groupId ?? (selectedGroup || undefined),
      });
      setName('');
      setDeadline('');
      if (groupId === undefined) {
        setSelectedGroup('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
      <TextField
        label="タスク名"
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ flexGrow: 1, minWidth: 200 }}
      />
      <TextField
        label="期限"
        type="datetime-local"
        size="small"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      {groupId === undefined && (
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>グループ</InputLabel>
          <Select value={selectedGroup} label="グループ" onChange={handleGroupChange}>
            <MenuItem value="">なし</MenuItem>
            {groups.map((g) => (
              <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Button type="submit" variant="contained" disabled={isSubmitting || !name.trim()}>
        追加
      </Button>
    </Box>
  );
};
