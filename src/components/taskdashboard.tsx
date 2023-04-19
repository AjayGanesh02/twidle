import { Task } from "@prisma/client";
import axios from "axios";

export default function TaskDashboard({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      {tasks.map((task, idx) => {
        return (
          <div
            key={idx}
            className="flex flex-col rounded-md border border-gray-500"
          >
            <div className="">{task.title}</div>
            <div className="">{task.description}</div>
            <button
              onClick={() => {
                void axios.delete(`/api/tasks/${task.id}`);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
