import Layout from '../../components/Layout';
import Date from '../../components/Date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';
import CodeBlock from '../../components/CodeBlock';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

const Button = ({ children }) => {
  return (
    <button
      className="bg-black text-lg text-teal-200 rounded-lg px-5 dark:bg-white dark:text-teal-700"
      onClick={() => alert('Thanks to')}
    >
      {children}
    </button>
  );
};

const components = {
  Button,
  CodeBlock,
};

export default function Post({ postData }) {
  const router = useRouter();
  console.log(postData);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <br />
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </Layout>
  );
}
