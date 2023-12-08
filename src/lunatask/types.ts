enum TaskStatus {
  Later = "later",
  Next = "next",
  Started = "started",
  Waiting = "waiting",
  Completed = "completed",
}

enum TaskPriority {
  Highest = 2,
  High = 1,
  Normal = 0,
  Low = -1,
  Lowest = -2,
}

enum TaskMotivation {
  Must = "must",
  Should = "should",
  Want = "want",
  Unknown = "unknown",
}

enum TaskEisenhower {
  UrgentImportant = 1,
  UrgentNotImportant = 2,
  ImportantNotUrgent = 3,
  NotUrgentOrImportant = 4,
  Uncategorized = 0,
}

interface ExternalSource {
  source: string;
  source_id: string;
}

interface Task {
  id: string;
  area_id: string;
  goal_id: string | null;
  status: TaskStatus;
  previous_status?: TaskStatus;
  estimate?: number;
  priority: TaskPriority;
  motivation: TaskMotivation;
  eisenhower: TaskEisenhower;
  sources: ExternalSource[];
  scheduled_on?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

class TaskEntity implements Task {
  id: string;
  area_id: string;
  goal_id: string | null;
  status: TaskStatus;
  previous_status?: TaskStatus;
  estimate?: number;
  priority: TaskPriority;
  motivation: TaskMotivation;
  eisenhower: TaskEisenhower;
  sources: ExternalSource[];
  scheduled_on?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;

  constructor(taskData: Task) {
    Object.assign(this, taskData);
  }
}
