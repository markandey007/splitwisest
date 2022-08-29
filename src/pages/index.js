import { useEffect } from "react";
import { useRouter } from "next/router";
import { isUserLoggedIn } from "../storage";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push("/login");
    }
  }, []);

  return (
    <Layout title="Dashboard - Splitwisest">
      <Dashboard />
    </Layout>
  );
}
