import Board from "Components/Board";
import { data } from "db/notice";
import { useEffect, useState } from "react";

const Detail = ({
  match: {
    params: { id },
  },
}) => {
  const [notice, setNotice] = useState(null);
  useEffect(() => {
    const index = data.findIndex((i) => i.id === Number(id));
    if (index !== -1) {
      setNotice(data[index]);
    }
  }, [id]);
  return notice && <Board title={notice.title} content={notice.content} />;
};

export default Detail;
