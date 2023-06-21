import React, { useState } from "react";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import "./page.css";
import OutletContainer from "../../components/admin/OutletContainer";

export default function Report() {
  const [select, setSelect] = useState(true);

  return (
    <>
      <OutletContainer>
        <PageLeft select={select}>
          {/* 스크롤 테스트용 영역 */}
          <div className="w-full h-[2000px] p-5">
            left page
            <button
              className="m-4 p-1 border"
              onClick={() => {
                setSelect((prev) => !prev);
              }}
            >
              selectBtn
            </button>
          </div>
        </PageLeft>
        <PageRight select={select}>right page</PageRight>
      </OutletContainer>
    </>
  );
}
