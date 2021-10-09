let format = "";
let array  = [[],[]]
let GPA = 0
let gpaInPercentage = 0

function getSemesterElement(Element) {
    // console.log(Element);
    while (true) {
        if ($(Element).hasClass("semester")) {
            break
        } else {
            Element = $(Element).parent()
        }
    }

    return Element
}

$(document).on('click', '.add-course', function () {

    let SemesterDiv = $(this).parent().parent()
    let SemesterIndex = SemesterDiv.index(".semester")
    let location = $(`.semester:eq(${SemesterIndex})`)
    let numOfRepetition = location.find(".num_of_row_wanted").val()
    let length = location.find("div #row").length + 1;

    //console.log(`num From Add func : ${length}`);
    
    if (length <= 20 && numOfRepetition <= 6) {

        for (let i = 1; i <= numOfRepetition; i++){
            length = location.find("div #row").length + 1;
            
            course = `<div id='row' class='row_${length}'>
            <span class='num'>${length}</span>
            <input type='text' name='field' class='course'>
            <select name='field_grade' class='grade' oninput='getValues(this)'>
                <option value='none'></option>
                <option value='4'>A+</option>
                <option value='3.8'>A</option>
                <option value='3.6'>A-</option>
                <option value='3.4'>B+</option>
                <option value='3.2'>B</option>
                <option value='3.0'>B-</option>
                <option value='2.8'>C+</option>
                <option value='2.6'>C</option>
                <option value='2.4'>C-</option>
                <option value='2.2'>D+</option>
                <option value='2.0'>D</option>
                <option value='0'>F</option>
            </select>
    
            <div class='formatAndPercentageSign'>
                <input type='number' min='0' max='4' name='field' class='format' oninput='getValues(this)'>
                <span class='percentageSign'>%</span>
            </div>
    
            <input type='number' value='3' name='field_credit' class='credits' oninput='getValues(this)'>
    
            <div class='remove-icon-course' title='Remove this row'>
                <svg version='1.1' class='x_remove' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 95.939 95.939' xml:space='preserve'>
                <g>
                    <path d='M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0
                        c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608
                        c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021
                        c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535
                        c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97
                        z'/>
                </g>
                </svg>
            </div>
        </div>`
            
            tableBody = location.find(".rows");
            tableBody.append(course)
            //console.log(numRow);
            rearrangeCourses(length, location)
            //getFormat()
            getValues(this)
        }
    }
});

$(document).on("click", ".remove-icon-course", function () {
    //     remove-icon => #row => .rows => .table => .semester
    let SemesterIndex = $(this).parent().parent().parent().parent().index(".semester")
    let location = $(`.semester:eq(${SemesterIndex})`)
    let length = location.find(".rows #row").length;
    if (length > 3) {
        
        $(this).parent().slideUp().promise().done(function() {
            $(this).remove();
            length = location.find(".rows #row").length;
            //console.log(`num From remove func : ${length}`);
            rearrangeCourses(length, location)
            getValues(location)
        });

    }

});

function rearrangeCourses(numRow, location) {
    //console.log(`--------num From remove func : ${numRow}`);

    for (let i = 1; i <= numRow; i++) {
        let row = location.find(`.rows #row:eq(${i-1})`)
        //console.log(row.attr("class"));
        //let row = rows.find(`#row:eq(${i-1})`)
        row.removeClass()
        row.addClass(`row_${i}`);
        row.find(".num").text(`${i}`)
        //console.error("ss");
    }
}

$(document).on("click", "#options-title", function () {
    let SemesterDiv = $(this).parent();
    let SemesterIndex = SemesterDiv.index(".semester")
    let currentSemester = $(`.semester:eq(${SemesterIndex})`)
    let options_section = currentSemester.find('#options-section')

    options_section.slideToggle();
    $(this).toggleClass("options-title-open");
    $(this).find(".slide svg").toggleClass("slide_icon");

});

$(document).on("click", ".clear", function () {
    let semesterDiv = $(this).parent().parent()
    let SemesterIndex = semesterDiv.index(".semester")
    let location = $(`.semester:eq(${SemesterIndex})`)

    location.find( "input[name='field']" ).val( "" );
    location.find( "input[name='field_credit']" ).val( 3 );
    location.find("select[name='field_grade'] option[value='none']").prop('selected', true);
    ResetColorsAndText()
    
});

function ResetColorsAndText(semester) {
    $(semester).find(".containerGPA , .estimate").css("background-color", "#15b7ed");
    $(semester).find(".GPA").text("--")
    $(semester).find(".estimate").text("Estimate")
}

function getFormat(element) {

    let Semester = getSemesterElement(element)
    //console.log(Semester);
    let numCourse = $(Semester).find(".rows #row").length;
    //console.log(numCourse);
    format = $(Semester).find('input[name="format"]:checked').attr('id');
    //console.log(format);
    let formatElement = Semester.find(".format")
    let GradeElement = Semester.find(".grade")
    //console.log(formatElement);
    //console.log(GradeElement);

    if (format == "Letter") {
        $(GradeElement).css("display", "block");
        
        //hide percentage Sign
        $(Semester).find(".formatAndPercentageSign").css("display", "none");
        $(Semester).find(".percentageSign").css("display", "none");

    }
    else if (format == "percentage") {
        $(formatElement).attr("max", "100");
        $(formatElement).css("border-width", "1px 0 1px 1px");
        $(formatElement).css("border-radius", "4px 0 0 4px");
        $(GradeElement).css("display", "none");

        //show percentage Sign
        $(Semester).find(".formatAndPercentageSign").css("display", "flex");
        $(Semester).find(".percentageSign").css("display", "flex");

        for (let i = 0; i < numCourse; i++) {
            let grade = $(Semester).find(`.row_${i+1} .format`);
            grade.val(`${((array[0][i])*100)/4}`)
        }
    }
    else{
        $(formatElement).attr("max", "4");
        $(formatElement).css("border-width", "1px");
        $(formatElement).css("border-radius", "2px");
        $(GradeElement).css("display", "none");

        //hide percentage Sign
        $(Semester).find(".formatAndPercentageSign").css("display", "flex");
        $(Semester).find(".percentageSign").css("display", "none");

        for (let i = 0; i < numCourse; i++) {
            let grade = $(Semester).find(`.row_${i+1} .format`);
            grade.val(`${array[0][i]}`)
        }
    }
    
}

function getValues(Element) {

    let Semester = getSemesterElement(Element)
    console.log(Semester);
    format = $(Semester).find('input[name="format"]:checked').attr('id');

    switch(format) {
        case "Letter":
            getValuesByLetter(Semester)
            console.log("getValuesByLetter()");
            break;
        case "percentage":
            getValuesByPercentage(Semester)
            console.log("getValuesByPercentage()");
          break;
        case "Point_Value":
            getValuesByPointVal(Semester)
            console.log("getValuesByPointVal()");
          break;

    }

    
}

function getValuesByLetter(Semester) {
    
    let numCourse = $(Semester).find(".rows #row").length;
    //console.log(`numCourse = ${numCourse}`);

    // Get Grade and Credits Values
    for (let i = 0; i < numCourse; i++) {
        let grade = $(Semester).find(`.row_${i+1} .grade option:selected`).val();
        let credits = $(Semester).find(`.row_${i + 1} .credits`).val();
        //console.log(`grade = ${grade}`);
        //console.log(`credits = ${credits}`);
        array[0][i] = +grade;
        array[1][i] = +credits;
    }

    getGPA(Semester)
}

function getValuesByPointVal(Semester) {
    let numCourse = $(Semester).find(".rows #row").length;

    for (let i = 0; i < numCourse; i++) {
        let grade = $(Semester).find(`.row_${i+1} .format`).val();
        let credits = $(Semester).find(`.row_${i+1} .credits`).val();
        array[0][i] = +grade;
        array[1][i] = +credits;
    }

    getGPA(Semester)
}

function getValuesByPercentage(Semester) {
    let numCourse = $(Semester).find(".rows #row").length;

    for (let i = 0; i < numCourse; i++) {
        let gradeInPercentage = $(Semester).find(`.row_${i+1} .format`).val();
        let grade = (gradeInPercentage * 4)/100
        let credits = $(Semester).find(`.row_${i+1} .credits`).val();
        array[0][i] = grade;
        array[1][i] = +credits;
    }

    getGPA(Semester)
}

function getGPA(semester) {

    let numCourse = $(semester).find(".rows #row").length;

    let sumGradeXcredits = 0;
    let GradeXcredits = 1;
    let totalCredits = 0;
    //let totalGrades = 0;

    for (let i = 0; i < numCourse; i++) {
        GradeXcredits = array[0][i] * array[1][i]
        let credits = array[1][i]

        sumGradeXcredits += GradeXcredits;
        
        //totalGrades += grade;
        totalCredits += credits;
    }

    //calculate GPA and GPA in percentage
    GPA = sumGradeXcredits / totalCredits
    gpaInPercentage = (GPA * 100) / 4

    // Rounding
    GPA = rounding(GPA, 2)
    gpaInPercentage = rounding(gpaInPercentage, 2)

    ////////////////////////////////////////////
    console.log(`GPA = ${GPA}`);
    console.log(`gpaInPercentage = ${gpaInPercentage}`);
    console.table(array);

    if (!isNaN(GPA) && GPA <= 4) {printGPA(semester)}
    else { ResetColorsAndText(semester) }
    getTotalGPA()
    
}

function rounding(num, digit) {
    let NUM = num.toFixed(digit)
    return NUM
}

function printGPA(semester) {
    $(semester).find(".GPA").text(`${GPA}`)
    coloring(semester, gpaInPercentage)
    
}

function coloring(semester, Percentage) { 
    let containerGpaAndEstimate = $(semester).find(".containerGPA, .estimate")
    let Estimate = $(semester).find(".estimate")
    if (Percentage < 50) {containerGpaAndEstimate.css("background-color", "#ee4539"); Estimate.text(`${Percentage}% | Weak | F`)}
    else if(Percentage >= 50 && Percentage < 60){containerGpaAndEstimate.css("background-color", '#c2843d'); Estimate.text(`${Percentage}% | Sufficient | D`)}
    else if(Percentage >= 60 && Percentage < 65){containerGpaAndEstimate.css("background-color", '#c2843d'); Estimate.text(`${Percentage}% | Sufficient | D+`)}
    else if(Percentage >= 65 && Percentage < 69){containerGpaAndEstimate.css("background-color", '#ffc038'); Estimate.text(`${Percentage}% | Good | C-`)}
    else if(Percentage >= 69 && Percentage < 72){containerGpaAndEstimate.css("background-color", '#ffc038'); Estimate.text(`${Percentage}% | Good | C`)}
    else if(Percentage >= 72 && Percentage < 75){containerGpaAndEstimate.css("background-color", '#ffc038'); Estimate.text(`${Percentage}% | Good | C+`)}
    else if(Percentage >= 75 && Percentage < 79){containerGpaAndEstimate.css("background-color", '#5db747'); Estimate.text(`${Percentage}% | Very Good | B-`)}
    else if(Percentage >= 79 && Percentage < 82){containerGpaAndEstimate.css("background-color", '#5db747'); Estimate.text(`${Percentage}% | Very Good | B`)}
    else if(Percentage >= 82 && Percentage < 85){containerGpaAndEstimate.css("background-color", '#5db747'); Estimate.text(`${Percentage}% | Very Good | B+`)}
    else if(Percentage >= 85 && Percentage < 90){containerGpaAndEstimate.css("background-color", '#00b3ff'); Estimate.text(`${Percentage}% | Excellent | A-`)}
    else if(Percentage >= 90 && Percentage < 95){containerGpaAndEstimate.css("background-color", '#00b3ff'); Estimate.text(`${Percentage}% | Excellent | A`)}
    else if(Percentage >= 95 && Percentage <= 100){containerGpaAndEstimate.css("background-color", '#00b3ff'); Estimate.text(`${Percentage}% | Excellent | A+`)}

    
}

function rearrangeSemester(element) {
    let Element = $(element).parent()
    //Element = Element.attr("id")
    // console.log(Element);
    

    while (true) {
        if (Element.attr("id") === "container") {
            break
        } else {
            Element = Element.parent()
        }

    }

    //console.log(Element);
    let numCourse = $(Element).find(".semesters .semester").length;
    // console.log(numCourse);
    //console.log(numCourse);
    //console.log(`numCourse = ${numCourse}`);
    for (let i = 0; i < numCourse; i++) {
        let titleSemester = Element.find(`.semesters .semester:eq(${i}) .title_semester span`)
        //console.log(`titleSemester = ${titleSemester}`);
        titleSemester.text(`Semester ${i + 1}`)
    }

}

$(document).on("click", ".remove-icon-semester", function () {
    

    let Element = $(this)

    //get container element
    while (true) {
        if (Element.attr("id") === "container") {
            break
        } else {
            Element = Element.parent()
        }
    }

    let semesterIndex = $(this).parent().parent().index(".semester")
    let semester = $(`.semester:eq(${semesterIndex})`)
    let numSemester = $(Element).find(".semesters .semester").length;

    if (numSemester > 1) {
        $(semester).slideUp().promise().done(function () {
            $(this).remove()
            $(".add-semester").removeClass("redHover");
        })
    }else{$(semester).shake()}
    // console.log(numSemester);

    for (let i = 1; i < numSemester; i++) {
        let titleSemester = Element.find(`.semesters .semester:eq(${i}) .title_semester span`)
        titleSemester.text(`Semester ${i}`)
    }

    getTotalGPA()
    
})


$(".dark_mode_btn").click(function () {
    $("body").toggleClass("dark");
    $("#container").toggleClass("dark_container");
    
})

$(".add-semester").click(function () { 
    let length = $(this).parent().parent().find("#container .semesters .semester").length
    // console.log(length);
    if (length < 6) {
        let newSemester = `<?php include 'php/semester.php' ?>`
        let tableBody = $(".semesters");
        tableBody.append(newSemester)
        rearrangeSemester($(this).parent().parent().find("#container .semesters"))
        $(this).removeClass("redHover");
    } else {
        $(this).addClass("redHover");
    }
    
});

function getTotalGPA() {
    let length = $(".add-semester").parent().parent().find("#container .semesters .semester").length
    let sumGPA = 0;
    let sumPercentage = 0;
    // console.log(`numSemester = ${length}`);

    if (length > 1) {
        for (let i = 0; i < length; i++) {
            sumGPA += parseFloat($(`.GPA:eq(${i})`).text())
            sumPercentage += parseFloat($(`.estimate:eq(${i})`).text().substr(0, 5))
            let totalGpaHtml = $(`.GPA:eq(${length})`)
            
            if (isNaN(sumGPA) || isNaN(sumPercentage)) {
                ResetColorsAndText((totalGpaHtml.parent().parent()))
            } else {
                let totalGPA = (sumGPA * 4 / (4 * length))
                let totalPercentage = (sumPercentage * 100 / (100 * length))
                totalPercentage = rounding(totalPercentage, 2)
                totalGPA = rounding(totalGPA, 2)
                totalGpaHtml.text(totalGPA)
                coloring((totalGpaHtml.parent().parent()), totalPercentage)
                // console.log(totalGpaHtml);
                $(".totalSemester").css("display", "block")
            }
        }
    }else{$(".totalSemester").css("display", "none")}
}
