import Head from "next/head";

interface AppHeadProps {
  title: string;
}

const AppHead: React.FC<AppHeadProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
    <link
      rel="icon"
      type="image/x-icon"
      className="js-site-favicon"
      href="https://github.githubassets.com/favicon.ico"
    />
  </Head>
);

export default AppHead;