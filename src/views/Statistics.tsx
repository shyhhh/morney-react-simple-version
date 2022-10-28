import Layout from "../components/Layout";
import React, { ReactNode, useState } from "react";
import { CategorySection } from "./Money/CategorySection";
import styled from "styled-components";
import { RecordItem, useRecords } from "components/hooks/useRecords";
import { useTags } from "components/hooks/useTags";
import day from "dayjs";

const CategoryWrapper = styled.div`
  background: #f3f3f3;
`;
const Header = styled.h3`
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f3f3f3;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 26px;
  > .note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
`;
function Statistics() {
  const [category, setCategory] = useState<"-" | "+">("-");
  const { records } = useRecords();
  const { getName } = useTags();
  const hash: { [K: string]: RecordItem[] } = {};
  const selectedRecords = records.filter((r) => r.category === category);

  selectedRecords.map((r) => {
    const key = day(r.createdAt).format("YYYY年MM月DD日");
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].push(r);
  });

  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0;
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });
  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>
      {array.map(([date, records]) => (
        <div>
          <Header>{date}</Header>
          {records.map((r) => {
            return (
              <Item>
                <div className="tags oneLine">
                  {r.tagIds
                    .map((tagId) => <span key={tagId}>{getName(tagId)}</span>)
                    .reduce(
                      (result, span, index, array) =>
                        result.concat(
                          index < array.length - 1 ? [span, "，"] : [span]
                        ),
                      [] as ReactNode[]
                    )}
                </div>
                {r.note && <div className="note">{r.note}</div>}
                <div className="amount">¥{r.amount}</div>
              </Item>
            );
          })}
        </div>
      ))}
    </Layout>
  );
}

export default Statistics;
