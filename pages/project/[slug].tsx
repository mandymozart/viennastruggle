import { lists } from '.keystone/api';
import {
    GetStaticPathsResult,
    GetStaticPropsContext,
    InferGetStaticPropsType
} from 'next';
import Link from 'next/link';
  
  export default function ProjectPage({
    project,
  }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
      <div>
        <main style={{margin: "3rem"}}>
        <div>
          <Link href="/">
            <a>&larr; back home</a>
          </Link>
        </div>
        <h1>{project.title}</h1>
        <p>{project.content}</p>
        </main>
      </div>
    );
  }
  
  export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const posts = await lists.Project.findMany({
      query: `slug`,
    });
  
    const paths = posts
      .map(project => project.slug)
      .filter((slug): slug is string => !!slug)
      .map(slug => `/project/${slug}`);
  
    return {
      paths,
      fallback: false,
    };
  }
  
  export async function getStaticProps({
    params,
  }: GetStaticPropsContext) {
    const [project] = await lists.Project.findMany({
      where: { slug: params!.slug as string },
      query: 'id title content',
    });
    return { props: { project } };
  }