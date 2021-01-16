export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
  fullName?: string;
}

export interface fbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Task {
  id?: string;
  name: string;
  description: string;
  storyPoints: string;
  createdBy: string;
  assignedTo: string;
  date: Date;
  status: string;
}

export interface UserDisplayData {
  id?: string;
  email: string;
}

export interface FbCreateResponse {
  name: string;
}

export interface onRemoveData {
  id: string;
  status: string;
}

export interface onChangeStatusData {
  task: Task,
  newStatusIndex: number;
}
