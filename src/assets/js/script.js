import $ from 'jquery';
import courses from '../constants/courses'
import semesterTemplate from '../constants/semesterTemplate'
import courseTemplate from '../constants/courseTemplate'


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
    } else {
        localStorage.setItem('my-settings', JSON.stringify(my_settings))
    }
    $('.course').autocomplete({
        source: courses, // list of items.
    });
})

$(document).on("click keypress", () => {
    // generate settings on click or press any key
    generateSettings()
})

const generateSettings = () => {
    var semestersElements = $('.semester');
    var [course, grade, credits, gradeType, numberOfRows] = ['', 0, 0, '', 0]
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
    var length = $('.semester').length;

    if (length < 8) {

        $('.semesters').append(semesterTemplate);

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
            let tableBody = semester.find('.rows');
            tableBody.append(courseTemplate);
            rearrange(semester, 'row', '', '.num');
            getValues(element);
            getFormat(element);
            $('.course').autocomplete({
                source: courses, // list of items.
            });
        }
    }
};

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

$(document).on('click', '.add-semester', function () {
    console.log('Add semester');
    addSemester();
})

$(document).on('click', '.add-course', function () {
    addRow(this);
});

$(document).on('click', '.remove-icon-course', function () {
  var row = getParent(this, 'row');
  var semester = getParent(this, 'semester');
  var length = getLength(semester, 'row');

  if (length > 3) {
    row
      .slideUp()
      .promise()
      .done(function () {
        $(this).remove();
        rearrange(semester, 'row', '', '.num');
        generateSettings();
      });
  }
});

$(document).on('click', '.remove-icon-semester', function () {
  var semester = getParent(this, 'semester');
  var length = $('.semester').length;
  $('.add-semester').css('display', 'block');
  $('.website-title').css('margin-right', '-39px');

  if (length > 1) {
    $(semester)
      .slideUp()
      .promise()
      .done(function () {
        $(this).remove();
        rearrange(document, 'semester', 'Semester ', '.title_semester span');
        generateSettings();
      });
  } else {
    $(semester).shake();
  }
});

$(document).on('click', '#options-title', function () {
  var semester = getParent(this, 'semester');
  var options_section = semester.find('#options-section');

  options_section.slideToggle();
  $(this).toggleClass('options-title-open');
  $(this).find('.slide svg').toggleClass('slide_icon');
});

$(document).on('click', '.clear', function () {
  var semester = getParent(this, 'semester');

  semester.find("input[name='field']").val('');
  semester.find("input[name='field_credit']").val(3);
  semester
    .find("select[name='field_grade'] option[value='none']")
    .prop('selected', true);
  getValues(semester);
});

$(document).on('input', '.credits', function () {
  getValues(this);
});

$(document).on('input', '.format', function () {
  getValues(this);
});

$(document).on('input', '.grade', function () {
  getValues(this);
});

$(document).on('input', '#format', function () {
  getFormat(this);
});