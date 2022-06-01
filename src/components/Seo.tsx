import Head from "next/head";

export default function Seo({ title }: { title: string }) {
  return (
    <Head>
      <title>{title} | 바람의나라 연 젠타임, 보스 타이머</title>
    </Head>
  );
}
