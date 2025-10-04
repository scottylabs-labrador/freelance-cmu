/*import pulls code from another file or library
we are importing links from tanstack, which is
react component for page navigation withoujt having to reload page */
import JobBox from "../components/jobbox/JobBox";
import Sidebar from "../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-row h-full">
      <aside className="w-64 bg-blue-100 border-r border-gray-300">
        <Sidebar />
      </aside>
      <section className="w-3/4 p-4">
        <h1>look at these jobs yo</h1>
        <p>job or smth</p>
        <JobBox
          JobTitle="job"
          JobDescription="descirption descirptioln"
          JobPoster="poster"
        ></JobBox>
      </section>
    </div>
  );
}
