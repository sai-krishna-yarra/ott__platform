import React from "react";
import { useSelector } from "react-redux";
import { Answer } from "../answer/answer";
import "./preview.css";

export const Preview = () => {
  const { questionsList, formHeading, formDescription } = useSelector(
    (state) => state
  );

  return (
    <>
      {questionsList ? (
        <div className="form-preview-section">
          <div className="form-heading-section">
            <h4>{formHeading}</h4>
            {formDescription && <h5>{formDescription}</h5>}
          </div>
          <span className="mand-text">* Mandatory Question</span>
          {questionsList.map((question, index) => {
            return (
              <div key={index} className="preview-answers">
                <p>
                  {index + 1 + "). "}
                  {question.questionTitle}
                  {question.isRequired && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </p>
                <Answer question={question} editable={false} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-preview-container">
          <h5>
            <span>!</span> You have no Form to Preview
          </h5>
        </div>
      )}
    </>
  );
};
