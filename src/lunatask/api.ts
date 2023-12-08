import axios from 'axios';

/**
 * API client for Lunatask.
 * https://lunatask.app/api/overview
 */
export class LunataskAPI {

  private readonly baseUrl: string = 'https://api.lunatask.app/v1';
  private readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }


  /**
   * Check if the access token is valid.
   * @returns {Promise<boolean>} - Successful or not.
   */
  async ping(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/ping`, {
        headers: {Authorization: `bearer ${this.accessToken}`}
      });

      return response.data && response.data.message === 'pong';
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }


  /**
   * Retrieves all tasks from the specified source and source ID.
   * If no source or source ID is provided, retrieves all tasks.
   *
   * @param {string} [source] - The source of the tasks to retrieve.
   * @param {string} [source_id] - The ID of the source to retrieve tasks from.
   * @returns {Promise<Task[]>} - Tasks.
   * @throws {Error} - If there is an error retrieving the tasks.
   */
  async retrieveAll(source?: string, source_id?: string): Promise<Task[]> {
    try {
      const params: any = {};
      if (source) params.source = source;
      if (source_id) params.source_id = source_id;

      const response = await axios.get<RetrieveAllResponse>(`${this.baseUrl}/tasks`, {
        headers: {Authorization: `bearer ${this.accessToken}`},
        params
      });

      return response.data.tasks;
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      throw error;
    }
  }

  /**
   * Retrieve a single task by task ID.
   *
   * @param {string} taskId - The ID of the task to retrieve.
   * @returns {Promise<Task>} - Retrieved task.
   * @throws {Error} - If there is an error retrieving the task.
   */
  async retrieveSingle(taskId: string): Promise<Task> {
    try {
      const response = await axios.get<TaskResponse>(`${this.baseUrl}/tasks/${taskId}`, {
        headers: {Authorization: `bearer ${this.accessToken}`}
      });

      return response.data.task;
    } catch (error) {
      console.error(`Error retrieving task with ID ${taskId}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new task with the given parameters.
   *
   * @param {CreateTaskParams} taskParams - The parameters for creating the task.
   * @return {Promise<Task>} - Created task.
   * @throws {Error} - If there is an error creating the task.
   */
  async createTask(taskParams: CreateTaskParams): Promise<Task> {
    try {
      const response = await axios.post<TaskResponse>(`${this.baseUrl}/tasks`, taskParams, {
        headers: {
          Authorization: `bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  /**
   * Updates a task with the given task ID and task parameters.
   *
   * @param {string} taskId - The ID of the task to be updated.
   * @param {TaskWithUpdateParams} taskParams - The parameters for updating the task.
   * @returns {Promise<Task>} - Updated task.
   * @throws {Error} - If an error occurs while updating the task.
   */
  async updateTask(taskId: string, taskParams: TaskWithUpdateParams): Promise<Task> {
    try {
      const response = await axios.put<TaskResponse>(`${this.baseUrl}/tasks/${taskId}`, taskParams, {
        headers: {
          Authorization: `bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.task;
    } catch (error) {
      console.error(`Error updating task with ID ${taskId}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a task with the specified ID.
   *
   * @param {string} taskId - The ID of the task to be deleted.
   * @returns {Promise<Task>} - Deleted task.
   * @throws - If an error occurs during the deletion process.
   */
  async deleteTask(taskId: string): Promise<Task> {
    try {
      const response = await axios.delete<TaskResponse>(`${this.baseUrl}/tasks/${taskId}`, {
        headers: {Authorization: `bearer ${this.accessToken}`}
      });

      return response.data.task;
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
      throw error;
    }
  }
}
