import type { Route } from "./+types/home";
import {resumes} from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import Navbar from "~/components/Navbar";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function Home() {
  const {auth} = usePuterStore();
  const location = useLocation();
  //const next = location.search.split('next =')[1];

  const navigate = useNavigate();
  useEffect(() => {
    if(!auth.isAuthenticated)
      navigate('/auth?next=/');
  }, [auth.isAuthenticated]);
  return <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>
    <Navbar />
    <section className={"main-section"}>
      <div className={"page-heading"}>
        <h1>Track your Application & Resume Ratings</h1>
        <h2>Review your submissions and check AI powered feedback</h2>
      </div>


    {resumes.length > 0 && (
        <div className={"resume-section flex gap-2"}>
          {resumes.map((resume)=>(
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
    )}
    </section>

  </main>;
}

export default Home;
