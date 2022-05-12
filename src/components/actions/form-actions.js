export const saveFormAction = (formHeading, formDescription, questionsList) => {
  return {
    type: "save",
    formHeading,
    formDescription,
    questionsList,
  };
};
