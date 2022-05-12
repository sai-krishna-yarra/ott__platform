import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
} from "@material-ui/core";
import "./answer.css";

export const Answer = ({ question, index, cbToUpdate, editable }) => {

  const [value, setValue] = React.useState("");
  const [dropDownValue, setDropDownValue] = React.useState("");

  const updateValue = (event) => {
    setValue(event.target.value);
  };

  const updateAnswers = () => {
    question.answersList = value.toString().split(",");
    cbToUpdate(question, index);
  };

  return (
    <>
      {editable && <h6>Please enter the Answer below</h6>}
      <div className="answers-section">
        {question.answerType === "Short Answer" && (
          <div>
            <TextField
              id="standard-basic"
              label="Short Answer"
              variant="standard"
            />
          </div>
        )}
        {question.answerType === "Paragraph" && (
          <div>
            <TextField
              id="standard-multiline-static"
              label="Paragraph Answer"
              multiline
              rows={4}
              defaultValue=""
              variant="standard"
            />
          </div>
        )}
        {question.answerType === "Multiple Choice" && (
          <div>
            {editable && (
              <div className="add-option-section">
                <TextField
                  onChange={updateValue}
                  id="standard-basic"
                  label="Options"
                  variant="standard"
                  helperText="Enter Options separated by comma(,) Eg: Option1,Option2"
                />
                <Button variant="text" onClick={updateAnswers}>
                  + Save Options
                </Button>
              </div>
            )}
            {question.answersList.length > 0 && (
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="option"
                  name="row-radio-buttons-group"
                >
                  {question.answersList.map((option, index) => {
                    return (
                      <FormControlLabel
                        value={option}
                        key={index}
                        control={<Radio />}
                        label={option}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            )}
          </div>
        )}
        {question.answerType === "Checkbox" && (
          <div>
            {editable && (
              <div className="add-option-section">
                <TextField
                  onChange={updateValue}
                  id="standard-basic"
                  label="Options"
                  variant="standard"
                  helperText="Enter Options separated by comma(,) Eg: Option1,Option2"
                />
                <Button variant="text" onClick={updateAnswers}>
                  + Save Options
                </Button>
              </div>
            )}
            <div>
              {question.answersList.map((option, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={option}
                  />
                );
              })}
            </div>
          </div>
        )}
        {question.answerType === "DropDown" && (
          <div>
            {editable && (
              <div className="add-option-section">
                <TextField
                  onChange={updateValue}
                  id="standard-basic"
                  label="Options"
                  variant="standard"
                  helperText="Enter Options separated by comma(,) Eg: Option1,Option2"
                />
                <Button variant="text" onClick={updateAnswers}>
                  + Save Options
                </Button>
              </div>
            )}
            {question.answersList.length > 0 && (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Answer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id={"demo-simple-select-standard"}
                  value={dropDownValue}
                  onChange={(event) => setDropDownValue(event.target.value)}
                  label="Answer"
                >
                  {question.answersList.map((option, index) => {
                    return (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </div>
        )}
        {question.answerType === "Date and Time" && <div>Coming Soon</div>}
      </div>
    </>
  );
};
