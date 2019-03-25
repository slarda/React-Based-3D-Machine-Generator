import React from "react";
import "./auto.scss";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

import InputSelectAuto from "./InputSelectAuto";
import InputSelectRadius from "./InputSelectRadius";
import InputSelectAngle from "./InputSelectAngle";

import ParametersWindow from "./ParametersWindow";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Auto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "straight",
      isChecked: false,
      angle90: true,
      angle45: false,
      angle135: false,
      isCheckedGrooves: false,
      valueFarEdge:'Drilled'
    };
  }
  handleRadioChange = event => {
    event.preventDefault();

    this.setState({ value: event.target.value });
    // console.log(this.state.value, "this.state.value");
  };
  // resetButton = () => {
  //     this.setState({ value: "emsx1" });
  // };
  handleChecked = event => {
    window.setTimeout(() => {
      this.setState({
        isChecked: !this.state.isChecked
      });
    }, 0);
  };

  handleCheckedGrooves = event => {
    window.setTimeout(() => {
      this.setState({
        isCheckedGrooves: !this.state.isCheckedGrooves
      });
    }, 0);
  };

  handleRadioChangeFerEdge = event => {
    event.preventDefault();

    this.setState({ valueFarEdge: event.target.value });
    // console.log(this.state.value, "this.state.value");
  };
  render() {
    return (
      <div className="Auto">
        <p className="AutoTitle">
          Use this selection to design the shape of your part.
        </p>
        {/* <div className="RadioButton"> */}
        <fieldset className="RadiButtonsFieldset">
          <legend>Near edge</legend>
          <div className="RadioButtons">
            <div className="RadioButtonsElelemt">
              <FormControl>
                <RadioGroup
                  value={this.state.value}
                  onChange={this.handleRadioChange}
                >
                  <FormControlLabel
                    classes={{ root: "root" }}
                    // style={{border:'1px solid red',paddinTop:'0px!important'}}
                    value="straight"
                    control={
                      <Radio
                        classes={{ root: "root" }}
                        color="primary"
                      />
                    }
                    label="Straight"
                  />
                  <FormControlLabel
                    classes={{ root: "root" }}
                    value="chamfer"
                    control={
                      <Radio
                        style={{ margin: "0px" }}
                        color="primary"
                      />
                    }
                    label="Chamfer"
                  />
                  <FormControlLabel
                    classes={{ root: "root" }}
                    value="round"
                    control={
                      <Radio
                        color="primary"
                      />
                    }
                    label="Round"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="RadioButtonsContent">
              {this.state.value === "straight" && (
                <div className="Chamfer">
                  <div>
                    <img src="resources/images/straight.png" />
                  </div>
                </div>
              )}
              {this.state.value === "chamfer" && (
                <div className="Chamfer">
                  <div>
                    <img src="resources/images/Chamfer.png" />
                  </div>
                  <div className="Inputs">
                    <div className="InputSizeGroup">
                      <label>Size:</label>
                      <input
                        type="text"
                        className="InputSize"
                    
                      />
                    </div>
                    <div className="InputSelectAngleGroup">
                      <span>Angle:</span>

                      <span className="InputSelectAngle">
                        <InputSelectAuto />
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {this.state.value === "round" && (
                <div className="Chamfer">
                  <div>
                    <img src="resources/images/radius.png" />
                  </div>
                  <div className="Inputs">
                    {/* <div className="InputSizeGroup"> */}

                    <div className="InputSelectRadiusGroup">
                      <span>Radius:</span>

                      <span className="InputSelectRadius">
                        <InputSelectRadius />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </fieldset>
        <fieldset className="Checkbox">
          <legend>Stock material wall</legend>
          <div className="RadioButtons">
            <div className="RadioButtonsElelemt">
              <Checkbox
                checked={this.state.isChecked}
                onChange={this.handleChecked}
                color="primary"
              />
            </div>
            <div className="RadioButtonsContent">
              <div className="Chamfer">
                <p className="AutoTitle">
                  Use to specify raw material shape of tube, beam, etc. -
                  specify vendor and part number in comments.
                </p>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="AngleInputFieldset">
          <legend>Side wall</legend>
          <div className="RadioButtons">
            <div className="RadioButtonsElelemt" />
            <div className="RadioButtonsContent">
              <div className="Chamfer">
                <div>
                  {this.state.angle90 === true && (
                    <img src="resources/images/angle90.png" />
                  )}
                  {this.state.angle45 === true && (
                    <img src="resources/images/angle45.png" />
                  )}
                  {this.state.angle135 === true && (
                    <img src="resources/images/angle135.png" />
                  )}
                </div>
                <div className="InputAngle">
                  <div className="InputSelectAngleGroup2">
                    <span>Angle:</span>

                    <span className="InputSelectAngle2">
                      <InputSelectAngle />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </div>
             <div>
<hr />
</div> 

            <div className="RadioButtons">
              <div className="RadioButtonsElelemt">
                <Checkbox
                  checked={this.state.isCheckedGrooves}
                  onChange={this.handleCheckedGrooves}
                  color="primary"
                />
                Grooves
              </div>
              <div className="RadioButtonsContent">
                <div className="Chamfer">
                  <div>
                    <img src="resources/images/Grooves1.png" />
                  </div>
                <div className="InputAngle">
                  <div className="InputSelectAngleGroup2">
                    <Button
                    className="Parameters"
                      onClick={
                    ()=> this.props.updateSetGrooves(!this.props.openSetGrooves)
                      }
                      style={{ backgroundColor: "#dddada" }}
                      color="primary"
                      autoFocus
                    >
                      Parameters...
                    </Button>
                  </div>
                </div>
                </div>
              </div>
            </div>
      
        </fieldset>
        <fieldset className="RadioFarEdge">
          <legend>Far edge</legend>
          <div className="RadioButtons">
            <div className="RadioButtonsElelemt">
              <FormControl>
                <RadioGroup
                  value={this.state.valueFarEdge}
                  onChange={this.handleRadioChangeFerEdge}
                >
                  <FormControlLabel
                    disabled
                    classes={{ root: "root" }}
                    // style={{border:'1px solid red',paddinTop:'0px!important'}}
                    value="Drilled"
                    control={
                      <Radio
                        classes={{ root: "root" }}
                        color="primary"
                      />
                    }
                    label="Drilled*"
                  />
                  <FormControlLabel
                  disabled
                    classes={{ root: "root" }}
                    value="Round"
                    control={
                      <Radio
                        style={{ margin: "0px" }}
                        color="primary"
                      />
                    }
                    label="Round"
                  />
                  <FormControlLabel
                    disabled
                    classes={{ root: "root" }}
                    value="Straight"
                    control={
                      <Radio
                        color="primary"
                      />
                    }
                    label="Straight"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="RadioButtonsContent">
            <div className="Chamfer">
                  <div>
                    <img src="resources/images/Grooves1.png" />
                  </div>
                  <div className="InputAngle">
                    {/* <div className="InputSizeGroup"> */}

                    <div className="InputFarEdge">
                    <span className="AutoTitle" style={{color:'grey'}}>A small fillet will be applied<br/
                    > to prevent stress cracks.<br/> Drill bottom holes are usually<br/>
                     less expensive.</span>
                      {/* <span>Radius:</span>*/}

                      {/* <span className="InputSelectAngle2">
                     
                      </span>  */}
                    </div>
                  </div>
                </div>
           </div>
          </div>
        </fieldset>
        <fieldset className="Notes">
          <legend>Notes</legend>
          <p className="AutoTitle">
            To set edge settings for the Bottom view first select View | Bottom.
          </p>
          <p className="AutoTitle">
            *Drilled holes may be machined with flat bottoms.
          </p>
        </fieldset>
        <ParametersWindow/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    openSetGrooves: state.setGroovesReducer.openSetGrooves,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSetGrooves: openSetGrooves => {
      dispatch({
        type: "OPEN_SET_GROOVES",
        payload: openSetGrooves,
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auto);