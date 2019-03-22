import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";

class ExpertNotice extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "0"
      };
    }
    handleRadioChange = event => {
      event.preventDefault();
  
      this.setState({ value: event.target.value });
    //   console.log(this.state.value, "this.state.value");
    };

    render() {
      console.log(this.props, "props-ExpertNoticeKU");
        return (
            <Dialog
                maxWidth={false}
                open={this.props.openExpertNotice}
                // open={false}
                // open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div
                    style={{
                        paddingBottom: '0px',
                        textAlign: "left",
                        width: "300px",
                        // height: "180px",
                        backgroundColor: '#f0ecec'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: "space-between",
                            marginTop: '5px',
                            paddingLeft: '15px'
                        }}>
                        <span>Expert Notice</span>

                        <Button
                            onClick={() => {
                                store.dispatch({
                                    type: "OPEN_EXPERT_NOTICE",
                                    payload: !this.props.openExpertNotice,
                                    payloadText: this.props.expertNoticeText,
                                    payloadParamArr: this.props.expertParamArr
                                });
                            }}
                            style={{
                                backgroundColor: '#f0ecec',
                                padding: '0px',
                            }}
                            color="primary"
                            autoFocus
                        >
                            <i className="material-icons">
                                cancel_presentation
                </i>
                        </Button>
                    </div>
                    <div className="Text"
                        style={{ margin: "15px 15px", textAlign: 'left' }}>
                        <img
                            width="30px"
                            src="images/InfoIcon.png"
                        />
                        <p style={{ position: 'relative', bottom: '25px', marginLeft: "40px", textAlign: 'left' }}>
                            {this.props.expertNoticeText}
                        </p>
                    </div>
                    <div className="RadioButton" style={{ margin: '15px', border: '1px solid #000', padding: '5px' }}>
                        <FormControl>
                            <RadioGroup
                                value={this.state.value}
                                onChange={this.handleRadioChange}
                            >
                                {this.props.expertParamArr.map(
                                    (el, i) => (
                                        <FormControlLabel
                                            onClick={el.callback}
                                            key={i}
                                            classes={{ root: "root" }}
                                            value={i.toString()}
                                            control={
                                                <Radio
                                                    classes={{ root: "root" }}
                                                    color="primary"
                                                />
                                            }
                                            label={el.text}
                                        />
                                    )
                                )
                                }
                            </RadioGroup>
                        </FormControl>
                    </div>
            <div 
            style={{display:'flex', justifyContent:'flex-end', margin:'10px'}}
            >
                <Button
                    onClick={() => {
                    store.dispatch({
                        type: "OPEN_EXPERT_NOTICE",
                        payload: !this.props.openExpertNotice,
                        payloadText: this.props.expertNoticeText,
                        payloadParamArr: this.props.expertParamArr
                        });
                            }}
                    style={{
                        backgroundColor: "#dddada",
                        boxShadow: "2px 2px 1px #000",
                        marginRight: "5px",
                        padding:'2px 2px',
                    }}
                    color="primary"
                    autoFocus
                >
                OK
                </Button>
                <Button
                    onClick={() => {
                    store.dispatch({
                        type: "OPEN_EXPERT_NOTICE",
                        payload: !this.props.openExpertNotice,
                        payloadText: this.props.expertNoticeText,
                        payloadParamArr: this.props.expertParamArr
                        });
                            }}
                    style={{
                        backgroundColor: "#dddada",
                        boxShadow: "2px 2px 1px #000",
                        marginLeft: "5px",
                        marginRight: "5px",

                        padding:'2px 2px',
                    }}
                    color="primary"
                    autoFocus
                >
                Cancel
                </Button>
            </div>
            </div>
            </Dialog>

            );
        }
    }

    const mapStateToProps = state => {
        return {
            openExpertNotice: state.expertNoticeReducer.openExpertNotice,
            expertNoticeText: state.expertNoticeReducer.expertNoticeText,
            expertParamArr:state.expertNoticeReducer.expertParamArr
      

        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            updateExpertNotice: (openExpertNotice,expertNoticeText,expertParamArr) => {
                dispatch({ type: "OPEN_EXPERT_NOTICE", 
                    payload: openExpertNotice,
                    payloadText:expertNoticeText, 
                    payloadParamArr:expertParamArr
                 });
                }
            };
        };

export default connect(mapStateToProps,mapDispatchToProps)(ExpertNotice)