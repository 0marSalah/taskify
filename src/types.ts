export type ProjectType = {
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  tasks: TaskType[];
};

export type TaskType = {
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
