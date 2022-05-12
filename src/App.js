import * as React from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import "./App.css";
import { Preview } from "./components/preview/preview";
import { Formbuilder } from "./components/form/formbuilder";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="section">
      <h1>Welcome to Form Builder App</h1>
      <div className="form-outer-section">
        <div className="form-section">
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Build Form" />
              <Tab label="Preview" />
            </Tabs>
          </Box>
          {value ? <Preview /> : <Formbuilder />}
        </div>
      </div>
    </div>
  );
}

export default App;
