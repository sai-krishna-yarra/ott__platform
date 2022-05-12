import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveFormAction } from "../actions/form-actions";
import { Answer } from "../answer/answer";
import "./formbuilder.css";

export const Formbuilder = () => {
  const question = {
    questionTitle: "",
    answerType: "",
    noOfAnswers: 0,
    answersList: [],
    isRequired: false,
    answer: "",
  };
  const store = useSelector((state) => state);
  const [dragId, setDragId] = useState();
  const [message, setMessage] = useState("");
  const [formHeading, setFormHeading] = useState(store.formHeading || "");
  const [formDescription, setFormDescription] = useState(
    store.formDescription || ""
  );
  const [questionsList, setQuestionsList] = useState(
    store.questionsList || [{ ...question }]
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    setMessage("");
  };

  const handleFormHeadingChange = (event) => {
    setFormHeading(event.target.value);
  };

  const handleFormDescChange = (event) => {
    setFormDescription(event.target.value);
  };

  const duplicateQuestion = (index) => {
    const tempQuestionList = questionsList;
    tempQuestionList.splice(index + 1, 0, { ...tempQuestionList[index] });
    setQuestionsList([...tempQuestionList]);
  };

  const removeQuestion = (index) => {
    const tempQuestionList = questionsList;
    tempQuestionList.splice(index, 1);
    setQuestionsList([...tempQuestionList]);
  };

  const handleQuestionChange = (value, index, field) => {
    const tempQuestionList = questionsList;
    tempQuestionList[index][field] = value;
    setQuestionsList([...tempQuestionList]);
  };

  const handleOptionsChange = (question, index) => {
    const tempQuestionList = questionsList;
    tempQuestionList[index] = question;
    setQuestionsList([...tempQuestionList]);
  };

  const handleDrop = (ev) => {
    if (
      typeof ev?.currentTarget?.id === "string" &&
      typeof dragId === "string"
    ) {
      const tempQuestionList = questionsList;
      [tempQuestionList[ev.currentTarget.id], tempQuestionList[dragId]] = [
        tempQuestionList[dragId],
        tempQuestionList[ev.currentTarget.id],
      ];
      setQuestionsList([...tempQuestionList]);
      setMessage("success,Order Changed Successfully");
    }
  };

  const handleDrag = (ev) => {
    setDragId(ev?.currentTarget?.id);
  };

  const saveForm = () => {
    if (!formHeading) {
      setMessage("error,Please Enter Form Heading");
      return;
    }
    let formErrorMessage = "";
    [...questionsList].forEach((question, index) => {
      if (!question.questionTitle) {
        formErrorMessage =
          "error,Please Enter Title for Question " + (index + 1);
      } else if (!question.answerType) {
        formErrorMessage =
          "error,Please select Answer Type for Question " + (index + 1);
      } else if (
        question.answersList.length === 0 &&
        (question.answerType === "Multiple Choice" ||
          question.answerType === "Checkbox" ||
          question.answerType === "DropDown")
      ) {
        formErrorMessage =
          "error,Please Enter Atleast One Option for Question " + (index + 1);
      }
    });
    if (formErrorMessage) {
      setMessage(formErrorMessage);
      return;
    }
    dispatch(saveFormAction(formHeading, formDescription, questionsList));
    setMessage("success,Successfully Saved");
    document.querySelectorAll(".MuiTabs-centered .MuiTab-root")[1].click();
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setFormHeading("");
    setFormDescription("");
    setQuestionsList([{ ...question }]);
    dispatch(saveFormAction("", "", ""));
  };
  const addQuestion = () => {
    setQuestionsList([...questionsList, { ...question }]);
    setTimeout(() => {
      document.querySelector(".each-question:last-child")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 500);
  };

  return (
    <div className="form-builder-section">
      <Button variant="text" className="reset-form" onClick={resetForm}>
        Reset Form
      </Button>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: "1", width: "28ch", margin: "28px 30px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={formHeading}
          onChange={handleFormHeadingChange}
          label="Form Title*"
          variant="standard"
        />
        <TextField
          value={formDescription}
          onChange={handleFormDescChange}
          label="Form Description (Optional)"
          variant="standard"
        />
        <div>
          {questionsList.length > 0 &&
            questionsList.map((question, index) => {
              return (
                <div
                  key={index}
                  className="each-question"
                  draggable={true}
                  id={index}
                  onDragOver={(ev) => ev.preventDefault()}
                  onDragStart={handleDrag}
                  onDrop={handleDrop}
                >
                  <TextField
                    onChange={(event) =>
                      handleQuestionChange(
                        event.target.value,
                        index,
                        "questionTitle"
                      )
                    }
                    value={question.questionTitle}
                    label={`Question ${index + 1}*`}
                    variant="standard"
                  />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Answer Type*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id={"demo-simple-select-standard-" + (index + 1)}
                      value={question.answerType}
                      onChange={(event) =>
                        handleQuestionChange(
                          event.target.value,
                          index,
                          "answerType"
                        )
                      }
                      label="Answer Type*"
                    >
                      <MenuItem value={"Short Answer"}>Short Answer</MenuItem>
                      <MenuItem value={"Paragraph"}>Paragraph</MenuItem>
                      <MenuItem value={"Multiple Choice"}>
                        Multiple Choice
                      </MenuItem>
                      <MenuItem value={"Checkbox"}>Checkbox</MenuItem>
                      <MenuItem value={"DropDown"}>DropDown</MenuItem>
                      <MenuItem value={"Date and Time"}>Date and Time</MenuItem>
                    </Select>
                  </FormControl>
                  {question.answerType && (
                    <Answer
                      question={question}
                      index={index}
                      cbToUpdate={handleOptionsChange}
                      editable={true}
                    />
                  )}
                  <div className="button-container">
                    <Button
                      variant="contained"
                      aria-label="outlined primary button"
                      onClick={() => duplicateQuestion(index)}
                    >
                      Duplicate
                    </Button>
                    <Button
                      variant="contained"
                      aria-label="outlined primary button"
                      onClick={() => removeQuestion(index)}
                    >
                      Remove
                    </Button>
                    <FormControlLabel
                      control={
                        <Switch
                          onChange={(event) =>
                            handleQuestionChange(
                              event.target.checked,
                              index,
                              "isRequired"
                            )
                          }
                        />
                      }
                      label="Mandatory"
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <Button
          variant="outlined"
          aria-label="outlined primary button"
          onClick={addQuestion}
        >
          Add Question
        </Button>
        <Button
          variant="contained"
          aria-label="outlined primary button"
          onClick={saveForm}
        >
          Save Form
        </Button>
      </Box>
      <Snackbar
        open={message ? true : false}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message?.split(",")[0] || "success"}
          sx={{ width: "100%" }}
        >
          {message?.split(",")[1]}
        </Alert>
      </Snackbar>
    </div>
  );
};
