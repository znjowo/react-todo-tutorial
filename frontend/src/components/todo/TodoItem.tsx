import { Checkbox, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../../common/types';

interface Props {
  todo: Todo;
  onToggle: (id: number, checked: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date() && !todo.checked;

  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => onDelete(todo.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        checked={todo.checked}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      <ListItemText
        primary={
          <Typography
            sx={{
              textDecoration: todo.checked ? 'line-through' : 'none',
              color: todo.checked ? 'text.disabled' : 'text.primary',
            }}
          >
            {todo.name}
          </Typography>
        }
        secondary={
          todo.deadline && (
            <Typography
              variant="caption"
              sx={{ color: isOverdue ? 'error.main' : 'text.secondary' }}
            >
              期限: {formatDeadline(todo.deadline)}
            </Typography>
          )
        }
      />
    </ListItem>
  );
};
