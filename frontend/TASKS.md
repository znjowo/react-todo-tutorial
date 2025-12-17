# Frontend 実装タスクリスト

## 概要
Django バックエンドと連携する React + TypeScript + MUI フロントエンドの実装タスク一覧

## タスク一覧

### 1. 基盤設定

- [ ] **1.1 axios インストール**
  - `npm install axios`
  - HTTP クライアントライブラリの追加

### 2. 型定義

- [ ] **2.1 型定義ファイル作成** (`src/types/index.ts`)
  - User 型
  - Todo 型（deadline, created_at 追加）
  - TodoGroup 型
  - API レスポンス型

### 3. API クライアント

- [ ] **3.1 API クライアント作成** (`src/common/api/client.ts`)
  - axios インスタンス設定
  - JWT トークン自動付与（interceptor）
  - トークンリフレッシュ処理
  - エラーハンドリング

- [ ] **3.2 認証 API 作成** (`src/common/api/auth.ts`)
  - ログイン（POST /api/auth/login/）
  - ユーザー登録（POST /api/auth/register/）
  - トークンリフレッシュ（POST /api/auth/refresh/）
  - アカウント削除（DELETE /api/auth/delete/）

- [ ] **3.3 Todo API 更新** (`src/common/api/todo.ts`)
  - axios ベースに書き換え
  - ソート対応（sort_by パラメータ）
  - 期限切れ件数取得（GET /api/todos/overdue-count/）

- [ ] **3.4 Group API 作成** (`src/common/api/group.ts`)
  - グループ一覧取得（GET /api/groups/）
  - グループ作成（POST /api/groups/）
  - グループ詳細取得（GET /api/groups/{id}/）
  - グループ更新（PUT /api/groups/{id}/）
  - グループ削除（DELETE /api/groups/{id}/）

### 4. Context（状態管理）

- [ ] **4.1 AuthContext 作成** (`src/contexts/AuthContext.tsx`)
  - ユーザー認証状態管理
  - ログイン/ログアウト関数
  - トークン管理（localStorage）
  - 認証チェック

### 5. レイアウトコンポーネント

- [ ] **5.1 Header 作成** (`src/components/layout/Header.tsx`)
  - アプリタイトル
  - ナビゲーションリンク
  - ログイン/ログアウトボタン
  - ユーザー名表示

- [ ] **5.2 PrivateRoute 作成** (`src/components/layout/PrivateRoute.tsx`)
  - 認証チェック
  - 未認証時のリダイレクト

### 6. 認証コンポーネント

- [ ] **6.1 LoginForm 作成** (`src/components/auth/LoginForm.tsx`)
  - メールアドレス入力
  - パスワード入力
  - ログインボタン
  - 登録ページへのリンク
  - バリデーション

- [ ] **6.2 RegisterForm 作成** (`src/components/auth/RegisterForm.tsx`)
  - ユーザー名入力
  - メールアドレス入力
  - パスワード入力
  - パスワード確認入力
  - 登録ボタン
  - ログインページへのリンク
  - バリデーション

### 7. Todo コンポーネント

- [ ] **7.1 TodoForm 作成** (`src/components/todo/TodoForm.tsx`)
  - タスク名入力
  - 期限日時選択
  - 追加ボタン

- [ ] **7.2 TodoItem 作成** (`src/components/todo/TodoItem.tsx`)
  - チェックボックス
  - タスク名表示
  - 期限表示（期限切れは赤字）
  - 削除ボタン

- [ ] **7.3 TodoList 作成** (`src/components/todo/TodoList.tsx`)
  - Todo 一覧表示
  - ソート切り替え（作成日/期限）
  - 期限切れ件数バッジ

### 8. Group コンポーネント

- [ ] **8.1 GroupList 作成** (`src/components/group/GroupList.tsx`)
  - グループ一覧表示
  - グループ作成フォーム
  - グループ選択

- [ ] **8.2 GroupDetail 作成** (`src/components/group/GroupDetail.tsx`)
  - グループ名表示/編集
  - グループ内 Todo 表示
  - グループ削除

### 9. ページ更新

- [ ] **9.1 Top ページ更新** (`src/components/top/index.tsx`)
  - 新コンポーネント統合
  - グループ対応

- [ ] **9.2 Router 更新** (`src/configs/Router.tsx`)
  - `/login` - ログインページ
  - `/register` - 登録ページ
  - `/` - トップページ（認証必須）
  - `/groups` - グループ一覧（認証必須）
  - `/groups/:id` - グループ詳細（認証必須）

## ディレクトリ構造（完成後）

```
src/
├── common/
│   └── api/
│       ├── client.ts      # axios クライアント
│       ├── auth.ts        # 認証 API
│       ├── todo.ts        # Todo API
│       └── group.ts       # Group API
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── group/
│   │   ├── GroupList.tsx
│   │   └── GroupDetail.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── PrivateRoute.tsx
│   ├── todo/
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoList.tsx
│   └── top/
│       └── index.tsx
├── configs/
│   └── Router.tsx
├── contexts/
│   └── AuthContext.tsx
├── types/
│   └── index.ts
├── App.tsx
└── index.tsx
```

## 進捗管理

- 完了したタスクは `[ ]` を `[x]` に変更してください
- 各タスクは依存関係を考慮した順序で並んでいます
