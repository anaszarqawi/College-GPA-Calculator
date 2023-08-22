import React from 'react';
import { ToastContainer, cssTransition, toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { app } from '../utils/firebase-config.js';
import { getAnalytics, logEvent } from 'firebase/analytics';

const CalcContext = React.createContext({});

export const useCalc = () => React.useContext(CalcContext);

export default function CalcProvider({ children }) {
  const [totalGpa, setTotalGpa] = React.useState('UoU');
  const [totalPercentage, setTotalPercentage] = React.useState(null);
  const [totalGrade, setTotalGrade] = React.useState(null);
  const [totalEstimateGrade, setTotalEstimateGrade] = React.useState(null);
  const [copiedSemesters, setCopiedSemesters] = React.useState(null);
  const [resultsPopupIsOpened, setResultsPopupIsOpened] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(null);

  const [semesters, setSemesters] = React.useState([
    {
      name: '',
      isLocked: false,
      courses: [
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: '3',
        },
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: '3',
        },
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: '3',
        },
      ],
      gpa: null,
      estimate: {
        percentage: null,
        grade: null,
        estimateGrade: null,
      },
    },
  ]);

  const [grades, setGrades] = React.useState([
    {
      name: 'A+',
      value: 4.0,
    },
    {
      name: 'A',
      value: 3.8,
    },
    {
      name: 'A-',
      value: 3.6,
    },
    {
      name: 'B+',
      value: 3.4,
    },
    {
      name: 'B',
      value: 3.2,
    },
    {
      name: 'B-',
      value: 3.0,
    },
    {
      name: 'C+',
      value: 2.8,
    },
    {
      name: 'C',
      value: 2.6,
    },
    {
      name: 'C-',
      value: 2.4,
    },
    {
      name: 'D+',
      value: 2.2,
    },
    {
      name: 'D',
      value: 2.0,
    },
    {
      name: 'F',
      value: 0.0,
    },
  ]);

  const defaultGrades = [
    {
      name: 'A+',
      value: 4.0,
    },
    {
      name: 'A',
      value: 3.8,
    },
    {
      name: 'A-',
      value: 3.6,
    },
    {
      name: 'B+',
      value: 3.4,
    },
    {
      name: 'B',
      value: 3.2,
    },
    {
      name: 'B-',
      value: 3.0,
    },
    {
      name: 'C+',
      value: 2.8,
    },
    {
      name: 'C',
      value: 2.6,
    },
    {
      name: 'C-',
      value: 2.4,
    },
    {
      name: 'D+',
      value: 2.2,
    },
    {
      name: 'D',
      value: 2.0,
    },
    {
      name: 'F',
      value: 0.0,
    },
  ];

  const defaultSemester = {
    name: '',
    isLocked: false,
    courses: [
      {
        course: '',
        grade: {
          name: null,
          value: null,
        },
        credit: '3',
      },
      {
        course: '',
        grade: {
          name: null,
          value: null,
        },
        credit: '3',
      },
      {
        course: '',
        grade: {
          name: null,
          value: null,
        },
        credit: '3',
      },
    ],
    gpa: null,
    estimate: {
      percentage: null,
      grade: null,
      estimateGrade: null,
    },
  };

  React.useEffect(() => {
    setAnalytics(getAnalytics(app));
  }, []);

  React.useEffect(() => {
    localStorage.setItem('semesters', JSON.stringify(semesters));
    localStorage.setItem('grades', JSON.stringify(grades));
    calculateGPA();
  }, [semesters, grades]);

  React.useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const ToastTransition = cssTransition({
    enter: 'animate__animated animate__fadeInUp animate__faster',
    exit: 'animate__animated animate__fadeOutDown animate__faster',
    appendPosition: false,
    collapse: false,
    collapseDuration: 1,
  });

  const showMsg = (type, msg) => {
    if (type === 'error')
      toast.error(msg, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: ToastTransition,
        theme: 'colored',
      });
    else if (type === 'success')
      toast.success(msg, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: ToastTransition,
        theme: 'colored',
      });
    else if (type === 'info')
      toast.info(msg, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: ToastTransition,
        theme: 'colored',
      });
    else if (type === 'warning')
      toast.warning(msg, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: ToastTransition,
        theme: 'colored',
      });
  };

  const calculateGPA = () => {
    const newSemesters = [...semesters];
    let totalPoints = 0;
    let totalHours = 0;

    for (const semester of newSemesters) {
      let semesterPoints = 0;
      let semesterHours = 0;
      for (const course of semester.courses) {
        if (course.grade.value === null) {
          semester.gpa = null;
          semester.estimate.percentage = null;
          semester.estimate.grade = null;
          semester.estimate.estimateGrade = null;

          setTotalGpa(null);
          setTotalPercentage(null);
          setTotalGrade(null);
          setTotalEstimateGrade(null);
          return;
        } else {
          if (course.grade.name !== 'F') {
            semesterPoints += +course.grade.value * +course.credit;
            semesterHours += +course.credit;
          }
        }
        semester.gpa = (+semesterPoints / +semesterHours).toFixed(2);
        const percentage = (((+semesterPoints / +semesterHours) * 100) / 4).toFixed(2);
        semester.estimate.percentage = percentage;
        semester.estimate.grade = getGradeLetter(percentage);
        semester.estimate.estimateGrade = getEstimateGrade(semester.gpa);
      }

      totalPoints += semesterPoints;
      totalHours += semesterHours;

      setTotalGpa((+totalPoints / +totalHours).toFixed(2));
      const totalGpa_ = (+totalPoints / +totalHours).toFixed(2);
      const totalPercentage = (((+totalPoints / +totalHours) * 100) / 4).toFixed(2);
      setTotalPercentage(totalPercentage);
      setTotalGrade(getGradeLetter(totalPercentage));
      setTotalEstimateGrade(getEstimateGrade(totalGpa_));
    }
  };

  const getGradeName = (grade) => {
    const gradeObj = grades.find((gradeObj) => gradeObj.value === grade);
    return gradeObj.name;
  };

  const getGradeLetter = (percentage) => {
    if (percentage >= 95) return 'A+';
    else if (percentage >= 90) return 'A';
    else if (percentage >= 85) return 'A-';
    else if (percentage >= 82) return 'B+';
    else if (percentage >= 79) return 'B';
    else if (percentage >= 75) return 'B-';
    else if (percentage >= 72) return 'C+';
    else if (percentage >= 69) return 'C';
    else if (percentage >= 65) return 'C-';
    else if (percentage >= 60) return 'D+';
    else if (percentage >= 50) return 'D';
    else return 'F';
  };

  const getEstimateGrade = (gpa) => {
    if (gpa >= 3.6) return 'Excellent';
    else if (gpa >= 3) return 'Very Good';
    else if (gpa >= 2.4) return 'Good';
    else if (gpa >= 2) return 'Sufficient';
    else if (gpa >= 1.6) return 'Weak';
    else return 'Very Weak';
  };

  const resetGrades = () => {
    setGrades([
      {
        name: 'A+',
        value: 4.0,
      },
      {
        name: 'A',
        value: 3.8,
      },
      {
        name: 'A-',
        value: 3.6,
      },
      {
        name: 'B+',
        value: 3.4,
      },
      {
        name: 'B',
        value: 3.2,
      },
      {
        name: 'B-',
        value: 3.0,
      },
      {
        name: 'C+',
        value: 2.8,
      },
      {
        name: 'C',
        value: 2.6,
      },
      {
        name: 'C-',
        value: 2.4,
      },
      {
        name: 'D+',
        value: 2.2,
      },
      {
        name: 'D',
        value: 2.0,
      },
      {
        name: 'F',
        value: 0.0,
      },
    ]);
  };

  const handleCopyResults = (index) => {
    let text = '';

    if (index !== undefined) {
      text = `[ ${semesters[index].name || 'Semester ' + (index + 1)} ]`;
      semesters[index].courses.forEach((course, i) => {
        text += `\n  - ${course.course || 'Course ' + (i + 1)} ⇒ ${course.grade.name}`;
      });
      text += `\nGPA ⇒ ${semesters[index].gpa}`;

      text += `\nEstimate ⇒ ${semesters[index].estimate.percentage}% | ${semesters[index].estimate.estimateGrade} | ${semesters[index].estimate.grade}`;

      setCopiedSemesters(text);
      openPopup(setResultsPopupIsOpened);
      logEvent(analytics, 'generate to copy');

      return;
    }

    console.log('without index');
    semesters.forEach((semester, i) => {
      if (semester.gpa === null) return;
      if (i !== 0) {
        console.log(i !== 0);
        console.log(i !== semesters.length - 1);
        text += `\n\n`;
      }

      text += `[ ${semester.name || 'Semester ' + (i + 1)} ]`;
      semester.courses.forEach((course, i) => {
        text += `\n  - ${course.course || 'Course ' + (i + 1)} ⇒ ${course.grade.name}`;
      });
      text += `\nGPA ⇒ ${semester.gpa}`;
      text += `\nEstimate ⇒ ${semester.estimate.percentage}% | ${semester.estimate.estimateGrade} | ${semester.estimate.grade}`;
    });

    // get total gpa if more than one semester
    if (semesters.length > 1) {
      text += `\n\nTotal GPA ⇒ ${totalGpa}`;
      text += `\nTotal Estimate ⇒ ${totalPercentage}% | ${totalEstimateGrade} | ${totalGrade}`;
    }

    setCopiedSemesters(text);
    openPopup(setResultsPopupIsOpened);
  };

  // const changeThemeToDark = () => {
  //   document.documentElement.style.setProperty('--color-1', '#1a1e22');
  //   document.documentElement.style.setProperty('--color-2', '#272d33');
  //   document.documentElement.style.setProperty('--color-3', '#d8d2cc');
  //   document.documentElement.style.setProperty('--color-3-60', 'rgba(216, 210, 204, 0.6)');
  //   document.documentElement.style.setProperty('--color-3-50', 'rgba(216, 210, 204, 0.5)');
  //   document.documentElement.style.setProperty('--color-3-20', 'rgba(216, 210, 204, 0.2)');
  //   document.documentElement.style.setProperty('--color-3-10', 'rgba(216, 210, 204, 0.1)');
  //   setTheme('dark');
  //   localStorage.setItem('theme', 'dark');
  // };

  // const changeThemeToLight = () => {
  //   document.documentElement.style.setProperty('--color-1', '#fafafc');
  //   document.documentElement.style.setProperty('--color-2', '#eaeaed');
  //   document.documentElement.style.setProperty('--color-3', 'rgb(59, 60, 69)');
  //   document.documentElement.style.setProperty('--color-3-60', 'rgba(59, 60, 69, 0.6)');
  //   document.documentElement.style.setProperty('--color-3-50', 'rgba(59, 60, 69, 0.5)');
  //   document.documentElement.style.setProperty('--color-3-20', 'rgba(59, 60, 69, 0.2)');
  //   document.documentElement.style.setProperty('--color-3-10', 'rgba(59, 60, 69, 0.1)');
  //   setTheme('light');
  //   localStorage.setItem('theme', 'light');
  // };

  const openPopup = (setter) => {
    document.body.classList.add('with-popup');
    setter(true);
  };
  const hidePopup = (setter) => {
    document.body.classList.remove('with-popup');
    setter(false);
  };

  const value = {
    semesters,
    setSemesters,
    grades,
    setGrades,
    getGradeName,
    resetGrades,
    calculateGPA,
    defaultGrades,
    defaultSemester,
    totalGpa,
    totalPercentage,
    totalGrade,
    totalEstimateGrade,
    handleCopyResults,
    copiedSemesters,
    setCopiedSemesters,
    resultsPopupIsOpened,
    setResultsPopupIsOpened,
    openPopup,
    hidePopup,
    showMsg,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
}
