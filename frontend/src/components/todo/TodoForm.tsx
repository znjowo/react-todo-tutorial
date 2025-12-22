import { useState, useEffect } from 'react';
import { Box, TextField, Button, Autocomplete, Chip } from '@mui/material';
import { TodoCreateRequest, Tag } from '../../common/types';
import { getTags } from '../../common/api/tag';

interface Props {
  onSubmit: (data: TodoCreateRequest) => Promise<void>;
  groupId?: number;
}

export const TodoForm = ({ onSubmit, groupId }: Props) => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getTags().then(setAvailableTags).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        deadline: deadline || undefined,
        group: groupId,
        tag_ids: selectedTags.length > 0 ? selectedTags.map(t => t.id) : undefined,
      });
      setName('');
      setDeadline('');
      setSelectedTags([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="タスク名"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="期限"
          type="datetime-local"
          size="small"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting || !name.trim()}>
          追加
        </Button>
      </Box>
      {availableTags.length > 0 && (
        <Autocomplete
          multiple
          size="small"
          options={availableTags}
          getOptionLabel={(option) => option.name}
          value={selectedTags}
          onChange={(_, newValue) => setSelectedTags(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.name}
                size="small"
                {...getTagProps({ index })}
                key={option.id}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="タグ" placeholder="タグを選択" />
          )}
        />
      )}
    </Box>
  );
};
