import React, { Component } from 'react'
// import loading from '/loading.svg'
export class Placeholder extends Component {

    generateCards=(number)=>{
        let array = [];
        for (let i = 0; i < number; i++) {
            array.push(
           <div className='col-md-4 my-4 d-flex justify-content-center ' key={i}>
            <div className="card"  style={{ width: '24rem' }} aria-hidden="true">
                {/* <div>{loading}</div> */}
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    </p>
                    <a href="/" tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></a>
                </div>
             </div>
            </div>
           )
        }
        return array;
    }
  render() {
    return (
      <div className="row">
                {
                    this.generateCards(this.props.totalResults)
                }
      </div>
    
    )
  }
}

export default Placeholder