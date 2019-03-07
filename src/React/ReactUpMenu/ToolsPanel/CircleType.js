import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

 class CircleType extends React.Component {
  constructor(props) {
    super(props);
  this.state={diameter:app.config.diameter}
  }

// componentDidUpdate(prevProps, prevState) {
//  if (this.props.demensions !== prevProps.demensions) {

//    if (prevProps.demensions === "Millimeters") {
//      app.config.diameter = (this.state.diameter).replace(/[^0-9.]/g, "");
//    } else {
//      app.config.diameter = (this.state.diameter).replace(/[^0-9.]/g, "") * 25.4;
//    }

//    let diameter = app.config.diameter;

//    if (this.props.demensions === "Millimeters") {
//      this.setState({ diameter: diameter.toFixed(3) + " mm" });
//    } else {
//      this.setState({ diameter: (diameter / 25.4).toFixed(3) + ' "' });
//    }

//  }
// }

// handleChangeInputDiameter = e=>{
// // e.preventDefault();

// let diameter = e.target.value;

// this.setState({
//   diameter
// })
// if (e.charCode === 13) {
//   if (this.props.demensions === "Millimeters") {
//     this.setState({
//       diameter: diameter.replace(/[^0-9.]/g, "") + " mm"
//     });
//     let diameter1 = this.state.diameter.replace(/[^0-9.]/g, "")
// app.setRadiusForSelectedElements(diameter1/2);
// this.diameterInput.blur();
//   } else {
//     this.setState({
//       diameter: diameter.replace(/[^0-9.]/g, "") + ' "'
//     });
//     let diameter1 = this.state.diameter.replace(/[^0-9.]/g, "")
// app.setRadiusForSelectedElements(diameter1/2*25.4);
// this.diameterInput.blur();
//   }
// }

// }

  componentDidMount() {
    app.addHandler("selectElement", element => {

      if (app.selectElements.length == 1) {
        if (element.typeName === "Arc") {
         let radius = (app.selectElements[0].radius).toFixed(3);
         this.props.updateDiameter(radius*2);
      if (this.props.demensions === "Millimeters") {
        this.setState({ diameter: (radius*2).toFixed(3) + " mm"  });
      } else {
        this.setState({ diameter: (radius*2 / 25.4).toFixed(3) + ' "' });
      }
        }
      }
    });
  }
 
    //      let radius= (app.selectElements[0].radius).toFixed(3);
    //   if (this.props.demensions === "Millimeters") {
    //     app.config.diameter = (radius*2).toFixed(3) + " mm" 
    //     this.setState({ diameter: app.config.diameter });
    //   } else {
    //     app.config.diameter=(radius*2 / 25.4).toFixed(3) + ' "' 
    //     this.setState({ diameter: app.config.diameter });
    //   }
   componentDidUpdate(prevProps, prevState) {
     if (this.props.demensions !== prevProps.demensions) {

          let diameter = this.props.diameter;

       if (this.props.demensions === "Millimeters") {
         this.setState({ diameter: diameter.toFixed(3) + " mm" });
       } else {
         this.setState({ diameter: (diameter / 25.4).toFixed(3) + ' "' });
       }

     }
   }

  handleChangeInputDiameter = e=>{
    let diameter = e.target.value;
    
    this.setState({
      diameter
    })
    if (e.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          diameter: diameter.replace(/[^0-9.]/g, "") + " mm"
        });
        let diameter1 = this.state.diameter.replace(/[^0-9.]/g, "")
        this.props.updateDiameter(diameter1);

    app.setRadiusForSelectedElements(diameter1/2);
    this.diameterInput.blur();
      } else {
        this.setState({
          diameter: diameter.replace(/[^0-9.]/g, "") + ' "'
        });
        let diameter1 = this.state.diameter.replace(/[^0-9.]/g, "")
        this.props.updateDiameter(diameter1*25.4);

    app.setRadiusForSelectedElements(diameter1/2*25.4);
    this.diameterInput.blur();
      }
    }

  }
  render(){
  return (
    <>
      <ReactTooltip
          html={true}
          className="tooltipBackgroundTheme"
        />
    <button className="btn-Diameter">
      <a href="#">
        <img
          width="18px"
          src="images/Diameter18.png"
          data-place="bottom"
          data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
     press the Enter key.
    </span>"
        />
      </a>
    </button>
    <input
      type="text"
      value={this.state.diameter}
      onChange={this.handleChangeInputDiameter}
      onKeyPress={this.handleChangeInputDiameter}
      ref={input => {
        this.diameterInput = input;
      }}
      data-place="bottom"
      data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
   press the Enter key.
  </span>"
    />
  </>
   )}
  }
  const mapStateToProps = state => {
    return {
      demensions: state.preferencesReducer.demensions,
      diameter: state.toolsPanelReducer.diameter
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      updateDiameter: diameter => {
        dispatch({ type: "UPDATE_DIAMETER", payload: diameter });
      }
    };
  };
   export default connect(mapStateToProps,mapDispatchToProps)(CircleType);

  