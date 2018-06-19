//@flow
import React from "react";
import parseNumberAsSentence from "../../utils/parseNumberAsSentence";

type State = {
  numberToParse: string,
  error: string,
  numberSentence: string
};

const Input = ({ value, onChange, error }: any) => {
  return (
    <div>
      <input onChange={onChange} value={value} />
      {error !== "" && <span id="error">{error}</span>}
    </div>
  );
};

export default class NumberSentenceGenerator extends React.Component<
  any,
  State
> {
  constructor(props: any) {
    super(props);
    this.state = {
      numberToParse: "",
      error: "",
      numberSentence: ""
    };
  }
  updateValue = (e: any) => {
    var value = e.target.value;
    if (this.validateInput(value)) {
      this.setState({
        numberToParse: value,
        error: "",
        numberSentence: parseNumberAsSentence(value)
      });
    } else {
      this.setState({
        numberToParse: value,
        error: "Please enter a correct positive whole number",
        numberSentence: ""
      });
    }
  };

  validateInput = (value: string) => {
    console.warn(isNaN(Number(value)));
    return !isNaN(Number(value));
  };
  render() {
    return (
      <div>
        <h1>Please enter a number:</h1>
        <Input
          onChange={this.updateValue}
          error={this.state.error}
          value={this.state.numberToParse}
        />

        <hr />

        <h1>{this.state.numberSentence}</h1>
      </div>
    );
  }
}
