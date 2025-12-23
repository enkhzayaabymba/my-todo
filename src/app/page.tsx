import Navigation from "./components/Navigation";
import Task from "./todolist/Todolist";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Task></Task>
    </div>
  );
}
