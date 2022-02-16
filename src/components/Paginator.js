import React from "react";

class Paginator extends React.Component {
  render() {
    const {p1, p2, p3, p4, page} = this.props
    return(
      <div className="paginator">
        <span onClick={()=>this.props.onClick(p1)}>{p1} |</span>
        <span onClick={()=>this.props.onClick(p2)}>{p2} |</span>
        <span onClick={()=>this.props.onClick(p3)}>{p3} |</span>
        <span onClick={()=>this.props.onClick(p4)}>{p4} </span>
      </div>
    );
  }
}

export default Paginator;