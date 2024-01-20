import Homepage from "../components/homepage";
import Sidebar from "../components/sidebar";

export default function Home() {
  return (
    <div className="app">
      <Sidebar />
      <Homepage />
    </div>
  )
}