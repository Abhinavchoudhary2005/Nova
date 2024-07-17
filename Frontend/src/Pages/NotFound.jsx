import React from "react";
import "./CSS/NotFound.css";

export const NotFound = () => {
  return (
    <div>
      <div class="mainbox">
        <div class="err">4</div>
        <div className="err2">0</div>
        <div class="err3">4</div>
        <div class="msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go <a href="/E-commerce">home</a> and try from there.
          </p>
        </div>
      </div>
    </div>
  );
};
