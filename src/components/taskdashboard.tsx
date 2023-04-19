import { Task } from "@prisma/client";

export default function TaskDashboard({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      {tasks.map((task, idx) => {
        return (
          <div key={idx} className="flex flex-col rounded-md border border-gray-500">
            <div className="">{task.title}</div>
            <div className="">{task.description}</div>
          </div>
        );
      })}
    </div>
  );
}
