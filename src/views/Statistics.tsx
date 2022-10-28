import Layout from "../components/Layout";
import React, { useState } from "react";
import { CategorySection } from "./Money/CategorySection";
import styled from "styled-components";
import { useRecords } from "components/hooks/useRecords";
import { useTags } from "components/hooks/useTags";
import day from "dayjs";

const CategoryWrapper = styled.div`
  background: #f3f3f3;
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
  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>
      <div>
        {records.map((r) => {
          return (
            <Item>
              <div className="tags">
                {r.tagIds.map((tagId) => (
                  <span>{getName(tagId)}</span>
                ))}
              </div>
              {r.note && <div className="note">{r.note}</div>}
              <div className="amount">¥{r.amount}</div>
              {/* {day(r.createdAt).format("YYYY年MM月DD日")} */}
            </Item>
          );
        })}
      </div>
    </Layout>
  );
}

export default Statistics;
