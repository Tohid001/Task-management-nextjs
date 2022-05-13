import Layout from "../Components/Layout/Layout.jsx";
// import { UserProvider } from "../Context/TaskContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter;
  return (
    <Layout>
      <Component {...pageProps} key={router.asPath} />
    </Layout>
  );
}

export default MyApp;
