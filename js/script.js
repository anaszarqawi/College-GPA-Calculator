var format = "";
var array = [
    [], // Grades
    [] // Credits
]
var GPA = 0
var gpaInPercentage = 0
var my_settings = {};


$(document).ready(() => {
    if (localStorage.getItem('my-settings') != null) {
        my_settings = JSON.parse(localStorage.getItem('my-settings'))
        applySettings();

        // console.log(my_settings);
    } else {
        localStorage.setItem('my-settings', JSON.stringify(my_settings))
    }
})

$(document).on("click keypress", () => {
    // generate settings on click or press any key
    generateSettings()
})

const generateSettings = () => {
    var semestersElements = $('.semester');
    [course, grade, credits, gradeType, numberOfRows, json] = ['', 0, 0, '', 0, '']
    var rows = []
    var semesters = []

    my_settings['numOfSemesters'] = semestersElements.length;

    for (let semester of semestersElements) {
        var rowsElements = $(semester).find('.row');

        gradeType = getFormat(semester)
        numberOfRows = rowsElements.length

        for (let row of rowsElements) {
            if (gradeType === 'Letter') {
                grade = $(row).find('.grade').val()
            } else {
                grade = $(row).find('.format').val()
            }
            course = $(row).find('.course').val()
            credits = $(row).find('.credits').val()
            rows.push({ course: course, grade: grade, credits: credits });
        }

        semesters.push({
            numberOfRows: numberOfRows,
            gradeType: gradeType,
            rows: rows,
        });
        rows = []
    }
    my_settings["semesters"] = semesters
    localStorage.setItem('my-settings', JSON.stringify(my_settings));
}

const applySettings = () => {

    // Generating semesters
    for (let i = 1; i < my_settings.numOfSemesters; i++) {
        addSemester();
    }
    // declaring a list of semesters
    var semesters = $('.semester');

    for (let i = 0; i < semesters.length; i++) {
        // Generating Rows
        for (let j = 0; j < my_settings.semesters[i].numberOfRows - 3; j++) {
            addRow(semesters[i]);
        }

        // declaring a list of rows
        var rows = $(semesters[i]).find('.row')

        // Change grade type for current semester
        let gradeType = my_settings.semesters[i].gradeType
        $(semesters[i]).find(`#${gradeType}`).prop("checked", true);

        // call getFormat function to change grade input
        getFormat(semesters[i])

        // change values of title course & and grade according to grade type & credits
        for (let k = 0; k < rows.length; k++) {
            // check grade type to change
            if (gradeType === 'Letter') {
                // if a type == letter
                $(rows[k]).find('.grade').val(my_settings.semesters[i].rows[k].grade);
            } else {
                // if a type == percentage || point value
                $(rows[k]).find('.format').val(my_settings.semesters[i].rows[k].grade);
            }
            // set title course
            $(rows[k]).find('.course').val(my_settings.semesters[i].rows[k].course);
            // set credits
            $(rows[k]).find('.credits').val(my_settings.semesters[i].rows[k].credits);
        }
        // calculate gpa for each semester
        getValues(semesters[i]);
    }

}

const getParent = (currantElement, target) => {
    return $(currantElement).closest(`.${target}`)
}

const getLength = (parentClass, commonClass) => {
    return $(parentClass).find(`.${commonClass}`).length
}

const rearrange = (parentClass, commonClass, firstTile, TitlePath) => {
    var arrElements = $(parentClass).find(`.${commonClass}`)
    var length = getLength(parentClass, commonClass)

    for (var i = 0; i < length; i++) {
        $(arrElements[i]).find(TitlePath).text(`${firstTile}${i+1}`)
    }
}

const addSemester = () => {
    // console.log("Add Semester");
    var length = $('.semester').length;

    if (length < 8) {
        var newSemester = `<?php include 'php/semester.php' ?>`;
        $('.semesters').append(newSemester);

        rearrange(document, 'semester', 'Semester ', '.title_semester span');
        $(this).css('display', 'block');
        $('.website-title').css('margin-right', '-39px');
    } else {
        $(this).css('display', 'none');
        $('.website-title').css('margin-right', '0');
    }
}

const addRow = (element) => {
    var semester = getParent(element, 'semester');

    var numOfRepetition = semester.find('.num_of_row_wanted').val();

    if (length <= 20 && numOfRepetition <= 6) {
        for (var i = 1; i <= numOfRepetition; i++) {
            course = `<div class='row'>
            <span class='num'>0</span>
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
        </div>`;

            tableBody = semester.find('.rows');
            tableBody.append(course);
            rearrange(semester, 'row', '', '.num');
            getValues(element);
            getFormat(element);
        }
    }
};

$(".add-semester").on("click", function() {
    addSemester();
});

$(document).on('click', '.add-course', function() {
    addRow(this);
});

$(document).on("click", ".remove-icon-course", function() {
    var row = getParent(this, "row")
    var semester = getParent(this, "semester")
    var length = getLength(semester, "row")

    if (length > 3) {
        row.slideUp().promise().done(function() {
            $(this).remove();
            rearrange(semester, "row", "", ".num")
            generateSettings()
        });
    }
});

$(document).on("click", ".remove-icon-semester", function() {
    var semester = getParent(this, "semester")
    var length = $(".semester").length
    $(".add-semester").css("display", "block")
    $(".website-title").css("margin-right", "-39px")

    if (length > 1) {
        $(semester).slideUp().promise().done(function() {
            $(this).remove()
            rearrange(document, "semester", "Semester ", ".title_semester span")
            generateSettings()
        })
    } else { $(semester).shake() }

})

$(document).on("click", "#options-title", function() {
    var semester = getParent(this, "semester")
    var options_section = semester.find('#options-section')

    options_section.slideToggle();
    $(this).toggleClass("options-title-open");
    $(this).find(".slide svg").toggleClass("slide_icon");

});

$(document).on("click", ".clear", function() {
    var semester = getParent(this, "semester")

    semester.find("input[name='field']").val("");
    semester.find("input[name='field_credit']").val(3);
    semester.find("select[name='field_grade'] option[value='none']").prop('selected', true);
    getValues(semester)


});

const getFormat = (element) => {

    var semester = getParent(element, "semester")
    var format = $(semester).find('input[name="format"]:checked').attr('id');

    var formatElement = semester.find(".format")
    var GradeElement = semester.find(".grade")

    if (format == "Letter") {
        $(GradeElement).css("display", "block");

        //hide percentage Sign
        $(semester).find(".formatAndPercentageSign").css("display", "none");
        $(semester).find(".percentageSign").css("display", "none");

    } else if (format == "percentage") {
        $(formatElement).attr("max", "100");
        $(formatElement).css("border-width", "1px 0 1px 1px");
        $(formatElement).css("border-radius", "4px 0 0 4px");
        $(GradeElement).css("display", "none");

        //show percentage Sign
        $(semester).find(".formatAndPercentageSign").css("display", "flex");
        $(semester).find(".percentageSign").css("display", "flex");

    } else {
        $(formatElement).attr("max", "4");
        $(formatElement).css("border-width", "1px");
        $(formatElement).css("border-radius", "2px");
        $(GradeElement).css("display", "none");

        //hide percentage Sign
        $(semester).find(".formatAndPercentageSign").css("display", "flex");
        $(semester).find(".percentageSign").css("display", "none");
    }
    return format;

}

const getValues = (Element) => {

    var semester = getParent(Element, "semester")
    format = $(semester).find('input[name="format"]:checked').attr('id');

    switch (format) {
        case "Letter":
            getValuesByLetter(semester)
            break;
        case "percentage":
            getValuesByPercentage(semester)
            break;
        case "Point_Value":
            getValuesByPointVal(semester)
            break;

    }


}

const getValuesByLetter = (semester) => {

    var length = getLength(semester, "row")
    var rows = $(semester).find('.row')

    // Get Grade and Credits Values
    for (var i = 0; i < length; i++) {
        var grade = $(rows[i]).find(".grade option:selected").val();
        var credits = $(rows[i]).find(`.credits`).val();

        array[0][i] = +grade;
        array[1][i] = +credits;
    }
    getGPA(semester)
}

const getValuesByPointVal = (semester) => {

    var length = getLength(semester, "row")
    var rows = $(semester).find('.row')

    for (let i = 0; i < length; i++) {
        let grade = $(rows[i]).find(`.format`).val();
        let credits = $(rows[i]).find(`.credits`).val();

        array[0][i] = +grade;
        array[1][i] = +credits;

    }

    for (let i = 0; i < length; i++) {

        if (array[0][i] > 4 || array[0][i] < 0) {
            ResetColorsAndText(semester)
            return
        }
    }
    getGPA(semester)
}

const getValuesByPercentage = (semester) => {
    var length = getLength(semester, "row")
    var rows = $(semester).find('.row')

    for (let i = 0; i < length; i++) {
        let gradeInPercentage = $(rows[i]).find(`.format`).val();
        let grade = (gradeInPercentage * 4) / 100
        let credits = $(rows[i]).find(`.credits`).val();

        array[0][i] = grade;
        array[1][i] = +credits;
    }

    for (let i = 0; i < length; i++) {

        if (array[0][i] > 4 || array[0][i] < 0) {
            ResetColorsAndText(semester)
            return
        }
    }

    getGPA(semester)
}

const rounding = (num, digit) => {
    let NUM = num.toFixed(digit)
    return NUM
}

const getGPA = (semester) => {

    var length = getLength(semester, "row")
    var tempArr = [0, 0]
        // tempArr[0] += (grad*credit)
        // tempArr[1] += credit

    for (var i = 0; i < length; i++) {
        tempArr[0] += array[0][i] * array[1][i]
        tempArr[1] += array[1][i]
    }

    //calculate GPA and GPA in percentage
    GPA = tempArr[0] / tempArr[1]
    gpaInPercentage = (GPA * 100) / 4

    // Rounding
    GPA = rounding(GPA, 2)
    gpaInPercentage = rounding(gpaInPercentage, 2)

    if (!isNaN(GPA) && GPA <= 4) { printGPA(semester) } else { ResetColorsAndText(semester) }
    getTotalGPA()
}

const printGPA = (semester) => {
    $(semester).find(".GPA").text(`${GPA}`)
    coloring(semester, gpaInPercentage)
}

const coloring = (semester, Percentage) => {
    let containerGpaAndEstimate = $(semester).find(".containerGPA, .estimate")
    let Estimate = $(semester).find(".estimate")

    if (Percentage < 50) {
        containerGpaAndEstimate.css("background-color", "#ee4539");
        Estimate.text(`${Percentage}% | Weak | F`)
    } else if (Percentage >= 50 && Percentage < 60) {
        containerGpaAndEstimate.css("background-color", '#c2843d');
        Estimate.text(`${Percentage}% | Sufficient | D`)
    } else if (Percentage >= 60 && Percentage < 65) {
        containerGpaAndEstimate.css("background-color", '#c2843d');
        Estimate.text(`${Percentage}% | Sufficient | D+`)
    } else if (Percentage >= 65 && Percentage < 69) {
        containerGpaAndEstimate.css("background-color", '#ffc038');
        Estimate.text(`${Percentage}% | Good | C-`)
    } else if (Percentage >= 69 && Percentage < 72) {
        containerGpaAndEstimate.css("background-color", '#ffc038');
        Estimate.text(`${Percentage}% | Good | C`)
    } else if (Percentage >= 72 && Percentage < 75) {
        containerGpaAndEstimate.css("background-color", '#ffc038');
        Estimate.text(`${Percentage}% | Good | C+`)
    } else if (Percentage >= 75 && Percentage < 79) {
        containerGpaAndEstimate.css("background-color", '#5db747');
        Estimate.text(`${Percentage}% | Very Good | B-`)
    } else if (Percentage >= 79 && Percentage < 82) {
        containerGpaAndEstimate.css("background-color", '#5db747');
        Estimate.text(`${Percentage}% | Very Good | B`)
    } else if (Percentage >= 82 && Percentage < 85) {
        containerGpaAndEstimate.css("background-color", '#5db747');
        Estimate.text(`${Percentage}% | Very Good | B+`)
    } else if (Percentage >= 85 && Percentage < 90) {
        containerGpaAndEstimate.css("background-color", '#00b3ff');
        Estimate.text(`${Percentage}% | Excellent | A-`)
    } else if (Percentage >= 90 && Percentage < 95) {
        containerGpaAndEstimate.css("background-color", '#00b3ff');
        Estimate.text(`${Percentage}% | Excellent | A`)
    } else if (Percentage >= 95 && Percentage <= 100) {
        containerGpaAndEstimate.css("background-color", '#00b3ff');
        Estimate.text(`${Percentage}% | Excellent | A+`)
    }
}

const ResetColorsAndText = (semester) => {
    $(semester).find(".containerGPA , .estimate").css("background-color", "#15b7ed");
    $(semester).find(".GPA").text("--")
    $(semester).find(".estimate").text("Estimate")
}

const getTotalGPA = () => {
    var length = $(".semester").length
    var arrGpa = $(".semesters .GPA")
    var arrEstimate = $(".semesters .estimate")
    var totalGpaHtml = $(`.GPA:eq(${length})`)


    var sumGPA = 0;
    var sumPercentage = 0;

    if (length > 1) {
        for (let i = 0; i < length; i++) {

            sumGPA += parseFloat($(arrGpa[i]).text())
            sumPercentage += parseFloat($(arrEstimate[i]).text().substr(0, 5))

            if (isNaN(sumGPA) || isNaN(sumPercentage)) {
                ResetColorsAndText($(".totalSemester #Result"))
            } else {
                let totalGPA = (sumGPA * 4 / (4 * length))
                let totalPercentage = (sumPercentage * 100 / (100 * length))
                totalPercentage = rounding(totalPercentage, 2)
                totalGPA = rounding(totalGPA, 2)

                totalGpaHtml.text(totalGPA)
                coloring((totalGpaHtml.parent().parent()), totalPercentage)
                $(".totalSemester").css("display", "block")
            }
        }
    } else { $(".totalSemester").css("display", "none") }
}