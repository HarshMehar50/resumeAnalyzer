import type { Route } from "./+types/home";
//import {resumes} from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import Navbar from "~/components/Navbar";
import {usePuterStore} from "~/lib/puter";
import {useLocation , useNavigate} from "react-router";
import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router";
//import type { KVItem } from "~/types/puter";
//import type { Resume } from "../../types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function Home() {
  const {auth , kv} = usePuterStore();
  const location = useLocation();
  //const next = location.search.split('next =')[1];
  //const [resumeUrl , setResumeUrl] = useState("");
  const navigate = useNavigate();
  const [resumes , setResumes] = useState<Resume[]>([]);
  const [loadingResumes , setLoadingResumes] = useState(false);
  useEffect(() => {
    if(!auth.isAuthenticated)
      navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async ()=>{
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*" , true)) as KVItem[];
      const parsedResumes = resumes?.map((resume)=>(
          JSON.parse(resume.value) as Resume
      ));

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }
    loadResumes();
  }, []);

  return <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>
    <Navbar />
    <section className={"main-section"}>
      <div className={"page-heading"}>
        <h1>Track your Application & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ?(
            <h2>No resumes found upload your first to get feedback</h2>
            ) :(
        <h2>Review your submissions and check AI powered feedback</h2>
            )}
      </div>


      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" alt="Resume scanning animation" className="w-[200px]" />
          </div>
      )}


    {!loadingResumes && resumes.length > 0 && (
        <div className={"resume-section flex gap-2"}>
          {resumes.map((resume)=>(
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
    )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/uploads" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
    </section>

  </main>;
}

export default Home;
