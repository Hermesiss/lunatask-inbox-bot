interface RetrieveAllResponse {
  tasks: Task[];
}

interface CreateTaskParams {
  area_id: string;
  goal_id?: string;
  name?: string;
  note?: string;
  status?: string;
  motivation?: string;
  eisenhower?: number;
  estimate?: number;
  priority?: number;
  scheduled_on?: string;
  completed_at?: string;
  source?: string;
  source_id?: string;
}

interface TaskResponse {
  task: Task;
}

interface TaskUpdateParams {
  name?: string;
  note?: string;
}

type TaskWithUpdateParams = TaskUpdateParams & Task;
