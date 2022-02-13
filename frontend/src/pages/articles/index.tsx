import { GetServerSidePropsContext } from "next";
import Layout from "antd/lib/layout/layout";

interface ArticleProps {
  data: string[];
}

const Articles = ({ data }: ArticleProps) => {
  return (
    <Layout>
      <></>
    </Layout>
  );
};

export async function getServerSideProps() {
  // const

  return {
    data: artcles,
  };
}

export default Articles;
