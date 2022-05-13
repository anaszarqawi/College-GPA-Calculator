import Row from './Row'
import Options from './Options'
import Gpa from './Gpa'

export default function Semester() {
    return (
        <div className="semester">
        <div className="title_semester">
            <span>Semester 1</span>
            <div className="remove-icon-semester" title="Remove This Semester">
            <svg version="1.1" className="x_remove" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 95.939 95.939" xmlSpace="preserve">
                <g>
                <path d="M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0
                        c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608
                        c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021
                        c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535
                        c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97
                        z" />
                </g>
            </svg>
            </div>
        </div>
        <div className="table">
            <div className="titles">
            <div className="title">Course</div>
            <div className="title">Grade<sup style={{color: '#f00'}}>*</sup></div>
            <div className="title">Credit<sup style={{color: '#f00'}}>*</sup></div>
            </div>
            <div className="rows">
            <Row num='1'/>
            <Row num='2'/>
            <Row num='3'/>
            </div>
        </div>
        <div id="btns">
            <input type="number" max={12} title="Number of rows to add" defaultValue={1} className="num_of_row_wanted" />
            <button className="add-course" title="Add another course">Add Course</button>
            <button className="clear" title="Clear Data">Clear</button>
        </div>
        <Options/>
        <Gpa/>
        </div>
    )
}