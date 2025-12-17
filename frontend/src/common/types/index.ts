// User型
export type User = {
  id: number;
  email: string;
  username: string;
  created_at: string;
}

// Todo型
export type Todo = {
  id: number;
  name: string;
  checked: boolean;
  created_at: string;
  deadline: string | null;
  group: number | null;
  user: number;
  group_name: string | null;
}

// TodoGroup型
export type TodoGroup = {
  id: number;
  name: string;
  created_at: string;
  user: number;
}

// TodoGroup詳細型（Todo配列を含む)
export type TodoGroupDetail = TodoGroup & {
  todos: Todo[];
}

// 認証
export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  access: string;
  refresh: string;
}

export type RegisterRequest = {
  email: string;
  username: string;
  password: string;
}

// Todo 作成・更新

export type TodoCreateRequest = {
  name: string;
  deadline?: string;
  group?: number;
}

export type TodoUpdateRequest = Partial<TodoCreateRequest & {
  checked: boolean;
}>

// 期限切れカウント
export type OverdueCountResponse = {
  overdue_count: number;
}
