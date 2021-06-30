// Import the generated Lists API from Keystone
import { lists } from '.keystone/api';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';


// Home receives a `posts` prop from `getStaticProps` below
export default function Home({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <main style={{margin: "3rem"}}>
      <h1>Hello World! 👋🏻 </h1>
      <ul>
        {/* Render each post with a link to the content page */}
        {projects.map(project => (
          <li key={project.id}>
            <Link href={`/project/${project.slug}`}>
              <a>{project.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      </main>
    </div>
  )
}

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export async function getStaticProps() {
  const projects = await lists.Project.findMany({ query: 'id title slug' });
  return { props: { projects } };
}