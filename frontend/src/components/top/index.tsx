import { Container, Box, Typography } from '@mui/material';
import { TodoList } from '../todo/TodoList';

const Top = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo App
        </Typography>
        <TodoList />
      </Box>
    </Container>
  );
};

export default Top;
