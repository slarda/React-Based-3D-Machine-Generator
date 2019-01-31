import React from "react";
import "./tutorial.scss";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
export default class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "emsx1"
    };
  }
  handleRadioChange = event => {
    event.preventDefault();

    this.setState({ value: event.target.value });
    console.log(this.state.value, "this.state.value");
  };
  resetButton=()=>{
    this.setState({ value: "emsx1"});
  }
  render() {
    return (
      <div className="Tutorial">
        <p className="Title">
          When learning CAD it is recommended to open these samples first and
          see how they are drawn.
        </p>
        <div className="Parameters">
          <p>Parameters:</p>{" "}
          <Button
          onClick={this.resetButton}
            style={{
              backgroundColor: "#dddada",
              color: "orangered",
              boxShadow: "2px 2px 1px #000"
            }}
            color="primary"
            autoFocus
          >
            Reset
          </Button>
        </div>
        <div className="RadioButton">
          <FormControl>
            <RadioGroup
              value={this.state.value}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel
                classes={{ root: "root" }}
                value="emsx1"
                control={
                  <Radio
                    color="primary"
                    // color="default"
                    // style={{margin:"0px"}}
                  />
                }
                label="Quick start - Learn eMachineShop in minute with this quick easy tutorial"
              />
              <FormControlLabel
                value="emsx2"
                control={
                  <Radio
                    // classes={{ root: "root" }}
                    style={{ margin: "0px" }}
                    color="primary"
                    // color="default"
                  />
                }
                label="Flat shape cut from sheet material - this is the lowest cost type of part"
              />
              <FormControlLabel
                value="emsx3"
                control={
                  <Radio
                    color="primary"
                    //  color="default"
                  />
                }
                label="Sheet metal with bends - this economical type of part allows for more variety by bending sheet metal"
              />
              <FormControlLabel
                value="emsx4"
                control={
                  <Radio
                    color="primary"
                    //  color="default"
                  />
                }
                label="Typical machined part - shows how Z values create 3D shapes"
              />
              <FormControlLabel
                value="emsx5"
                control={
                  <Radio
                    color="primary"
                    //  color="default"
                  />
                }
                label="Revolve - shows how to design a part with concentric round features like a chess pawn"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="EMSXFile">
          {this.state.value === "emsx1" && (
            <>
              emsx1
            </>
          )}
          {this.state.value === "emsx2" && <>emsx2</>}
        
          {this.state.value === "emsx3" && <>emsx3</>}
          {this.state.value === "emsx4" && <>emsx4</>}
          {this.state.value === "emsx5" && <>emsx5</>}
        </div>
      </div>
    );
  }
}
