const initState = {
  formHeading: "",
  formDescription: "",
  questionsList: "",
};
const formReducer = (state = initState, action) => {
  if (action.type === "save") {
    return {
      ...state,
      formHeading: action.formHeading,
      formDescription: action.formDescription,
      questionsList: action.questionsList,
    };
  }
  return state;
};

export default formReducer;
