import CG2023_content from "../components/cg2023_content";
import Sidebar from "../components/sidebar";

export default function cg2023() {
  return (
    <div className="app">
      <Sidebar />
      <CG2023_content />
    </div>
  )
}