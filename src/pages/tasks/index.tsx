import type { Task } from "@prisma/client";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SignIn from "~/components/signin";
import TaskDashboard from "~/components/taskdashboard";

const TasksPage: NextPage = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    async function fetchTasks() {
      if (session) {
        const resp = await fetch(`/api/tasks`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const tasks: Task[] = await resp.json();
        setTasks(tasks);
      }
    }
    void fetchTasks();
  }, [session]);
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => void signOut()}>Sign out</button>
        <TaskDashboard tasks={tasks} />
      </>
    );
  } else {
    return <SignIn/>
  }
};

export default TasksPage;
