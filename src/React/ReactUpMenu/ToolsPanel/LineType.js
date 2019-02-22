import React from "react";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
import { connect } from "react-redux";

class LineType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: app.config.lengthLine
    };
  }

  componentWillMount() {
    app.addHandler("selectElement", element => {
      if (app.selectElements.length == 1) {
        if (element.typeName === "Line") {
          let lengthLine = element.length();
          if (this.props.demensions === "Millimeters") {
            app.config.lengthLine=lengthLine.toFixed(3) + " mm" 
            this.setState({ value: app.config.lengthLine });
          } else {
            app.config.lengthLine=(lengthLine / 25.4).toFixed(3) + ' "' 
            this.setState({ value: app.config.lengthLine });
          }
        }
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {

if (prevProps.demensions === "Millimeters") {
app.config.lengthLine=(this.state.value).replace(/[^0-9.]/g, "");
} else {
  app.config.lengthLine=(this.state.value).replace(/[^0-9.]/g, "")*25.4;
}
// console.log(this.state.value,'app.length')

let lengthLine= app.config.lengthLine;
// console.log(lengthLine,'app.line');

if (this.props.demensions === "Millimeters") {
  this.setState({ value: lengthLine.toFixed(3) +" mm"});
} else {
  this.setState({ value:(lengthLine / 25.4).toFixed(3) + ' "'});
}

  }
}
  handleChangeInputLength = event => {
    app.config.lengthLine = event.target.value;
    let length = app.config.lengthLine;
    app.setLineLengthElement(length);

    this.setState({ value: length });
    // if (event.charCode === 8) {
    //   event.stopPropagation();
    //   if (this.props.demensions === "Millimeters") {
    //     this.setState({
    //       value: length.replace(/[^0-9.]/g, "")
    //     });
    //   } 
    // }
    if (event.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          value: length.replace(/[^0-9.]/g, "") + " mm"
        });
      } else {
        this.setState({
          value: length.replace(/[^0-9.]/g, "") + ' "'
        });
      }
    }
  
  }
//   handleChangeLineAngle= (e) => {
// let angle = line.incrementAngle;
//   app.setLineAngleElement(angle)

//   } 


  render() {
    return (
      <Fragment>
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
        <button className="btn-Length">
          <a href="#">
            <img
              width="18px"
              src="images/Line.png"
              data-place="bottom"
              data-tip="<span>Length<br/>Distance from the beginning of the line to the end.To change<br/>
      enter a value and press the Enter key</span>"
            />
          </a>
        </button>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChangeInputLength}
          onKeyPress={this.handleChangeInputLength}
          data-place="bottom"
          data-tip="<span>Length<br/>Distance from the beginning of the line to the end.To change<br/>
      enter a value and press the Enter key</span>"
        />
        <button className="btn-LineAngle">
          <a href="#">
            <img
              width="18px"
              src="images/Line.png"
              data-place="bottom"
              data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
 enter a value and press the Enter key. </span>"
            />
          </a>
        </button>
        <input
          type="text"
          value={this.state.angle}
          onChange={this.handleChangeLineAngle}
          onKeyPress={this.handleChangeLineAngle}
          data-place="bottom"
          data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
 enter a value and press the Enter key. </span>"
        />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions
  };
};

export default connect(mapStateToProps)(LineType);
