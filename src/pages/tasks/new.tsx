import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import SignIn from "~/components/signin";
import axios from "axios";

const NewTaskPage: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex items-center justify-center">
        <form
          className="flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            const target = event.target as typeof event.target & {
              title: { value: string };
              description: { value: string };
            };
            void axios.post(
              "/api/tasks",
              {
                title: target.title.value,
                description: target.description.value,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text"></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text"></input>
          </div>
          <input type="submit"></input>
        </form>
      </div>
    );
  } else {
    return <SignIn />;
  }
};

export default NewTaskPage;
