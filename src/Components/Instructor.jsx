import React from "react";

class Instructor extends React.Component {
  componentDidUpdate() {
    console.log("Update - Instructor");
  }

  componentDidMount() {
    console.log("Mounted - Instructor");
  }

  componentWillUnmount() {
    console.log("UnMount - Instructor");
  }

  render() {
    console.log("Render - Instructor " + this.props.instructor);
    return (
      <div className="p-1">
        Name: {this.props.instructor.name} <br />
        Email: {this.props.instructor.email} <br />
        Phone: {this.props.instructor.phone} <br />
        <br />
      </div>
    );
  }
}

export default Instructor;
