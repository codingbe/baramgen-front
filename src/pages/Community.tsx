import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CommuHeader from "../components/Community/Header/CommuHeader";
import MainHeader from "../components/Community/Header/MainHeader";
import CommuMain from "../components/Community/Main/CommuMain";
import { setPage } from "../etc/redux/action";
import { ArticleInfo } from "../etc/typeDefs";
import { SERVER_URL } from "../etc/utils";

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 10px 15px;
  overflow-y: scroll;
  height: 50vh;
`;

export default function Community() {
  const [sub, setSub] = useState("");
  const [articles, setArticles] = useState<ArticleInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [cur, setCur] = useState("");
  const [value, setValue] = useState("");
  const type = "content";
  const [lPage, setLPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const page = useSelector((state: { page: number }) => state.page);
  const dispatch = useDispatch();
  const change = useSelector((state: { change: boolean }) => state.change);

  const getArticles = useCallback(
    async function () {
      setLoading(true);
      if (page === 0) {
        const data = await fetch(
          `${SERVER_URL}/articles?page=${page}&sortMethod=${cur}&categoryDivision=${sub}${
            value ? `&value=${value}&type=${type}` : ""
          }`
        ).then((res) => res.ok && res.json());
        setArticles(data.articles);
        setLPage(data.lastPage - 1);
      } else {
        for (let i = 0; i <= page; i++) {
          const data = await fetch(
            `${SERVER_URL}/articles?page=${i}&sortMethod=${cur}&categoryDivision=${sub}${
              value ? `&value=${value}&type=${type}` : ""
            }`
          ).then((res) => res.ok && res.json());
          if (i === 0) setArticles(data.articles);
          else setArticles((prev) => [...prev, ...data.articles]);
          setLPage(data.lastPage - 1);
        }
      }
      setLoading(false);
    },
    [cur, sub, type, page, value]
  );

  async function infiniteScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
    const totalHeight = e.currentTarget.scrollHeight; // 요소의 총 높이
    const currentScroll = e.currentTarget.scrollTop; // 스크롤 돼서 보이지 않는 구간의 높이
    const clientHeight = e.currentTarget.clientHeight; // 사용자에게 보여지는 요소의 높이
    const eventHeight = 200; // 총 높이가 1500 이라면 1300에서 다음 페이지를 불러오는 트리거
    if (totalHeight - eventHeight < currentScroll + clientHeight && page < lPage && !loading) {
      dispatch(setPage());
    }
  }

  useEffect(() => {
    getArticles();
  }, [getArticles, change]);

  return (
    <>
      <CommuHeader sub={sub} setSub={setSub} setValue={setValue} setArticles={setArticles} setLoading={setLoading} />
      <MainHeader setVisible={setVisible} cur={cur} setCur={setCur} visible={visible} />
      <Container onScroll={infiniteScroll}>
        <CommuMain
          articles={articles}
          loading={loading}
          setLoading={setLoading}
          visible={visible}
          setVisible={setVisible}
          setArticles={setArticles}
        />
      </Container>
    </>
  );
}
