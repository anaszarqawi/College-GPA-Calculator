import Semester from './Semester'
import Gpa from './Gpa'

export default function Container() {
    return (
        <div id="container">
        <div className="semesters">
            <Semester/>
        </div>

        <div className="totalSemester">
            <div className="Total_GPA">
                <span>Total GPA</span>
            </div>
            <Gpa/>
        </div>
    </div>
    )
}