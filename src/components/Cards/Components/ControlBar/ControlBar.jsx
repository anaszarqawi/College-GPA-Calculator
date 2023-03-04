import React from 'react';
import './style.scss';
import { useCalc } from '../../../../contexts/calcContext';
import { useScrollPosition } from '../../../../contexts/useScrollPosition';
import ControlButton from './ControlButton';
import { ReactComponent as ClipboardIcon } from '../../../../assets/svg/clipboard-icon.svg';
import { ReactComponent as LinkIcon } from '../../../../assets/svg/link-icon.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/svg/plus-icon.svg';
import { ReactComponent as ClockIcon } from '../../../../assets/svg/clock-icon.svg';
import { ReactComponent as BookMarkIcon } from '../../../../assets/svg/bookmark-icon.svg';
import { ReactComponent as ResetIcon } from '../../../../assets/svg/x-square.svg';
import { ReactComponent as CloseSquare } from '../../../../assets/svg/Close-Square.svg';
import { ReactComponent as ShareIcon } from '../../../../assets/svg/Send-icon.svg';

import Popup from '../../../Popup/Popup';

import axios from 'axios';

const ControlBar = () => {
  const {
    semesters,
    setSemesters,
    grades,
    setGrades,
    defaultGrades,
    handleCopyResults,
    copiedSemesters,
    setCopiedSemesters,
    totalGpa,
    resultsPopupIsOpened,
    setResultsPopupIsOpened,
    openPopup,
    hidePopup,
  } = useCalc();

  const [copySuccess, setCopySuccess] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [historyPopupIsOpened, setHistoryPopupIsOpened] = React.useState(false);

  React.useEffect(() => {
    const history = localStorage.getItem('history');
    if (history) {
      setHistory(JSON.parse(history));
    }
  }, []);

  const [isfloatOnScroll, setIsFloatOnScroll] = React.useState(false);

  useScrollPosition(
    ({ currPos }) => {
      const isShow = currPos.y < 150;
      console.log({ currPos, isShow });
      if (isShow !== isfloatOnScroll) setIsFloatOnScroll(isShow);
    },
    [isfloatOnScroll]
  );

  const handleCopy = async () => {
    const url = window.location.href;
    if (url.includes('localhost')) {
      return;
    }

    try {
      const response = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const shortenedLink = response.data.result.full_short_link;

      navigator.clipboard.writeText(shortenedLink);
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddSemester = () => {
    const newSemesters = [...semesters];
    newSemesters.push({
      name: '',
      isLocked: false,
      courses: [
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: 3,
        },
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: 3,
        },
        {
          course: '',
          grade: {
            name: null,
            value: null,
          },
          credit: 3,
        },
      ],
      gpa: null,
      estimate: {
        percentage: null,
        grade: null,
        estimateGrade: null,
      },
    });
    setSemesters(newSemesters);
    // calculateGPA();
  };

  const handleSave = () => {
    setHistory([...history, { semesters, date: new Date(), grades }]);
    localStorage.setItem('history', JSON.stringify(history));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handleDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  };

  const handleHistory = () => {
    openPopup(setHistoryPopupIsOpened);
  };

  const handleReset = () => {
    setSemesters([
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

    setGrades(defaultGrades);
  };

  const handleSelect = (item) => {
    setSemesters(item.semesters);
    hidePopup(setHistoryPopupIsOpened);
  };

  const handleRemove = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  // share a results for whatsapp
  //   *● Semester 1*
  // - Course 1 ⇒ A+
  // - Course 2 ⇒ B+
  // - Course 3 ⇒ A
  // - Course 4 ⇒ A+
  // - Course 5 ⇒ B
  // - Course 6 ⇒ A-
  // *● GPA ⇒ 3.67*
  // *● Estimate 91.67% | Excellent | A*

  return (
    <div className={`control-bar ${isfloatOnScroll ? 'float-bar' : ''}`}>
      <div className="control-bar-container">
        <div className="control-bar-buttons left-side">
          <ControlButton
            icon={<PlusIcon />}
            name={semesters.length !== 20 ? 'New Semester' : 'Max Semesters!'}
            onClick={semesters.length !== 20 ? handleAddSemester : null}
          />
          <ControlButton icon={<LinkIcon />} name={copySuccess ? 'Copied!' : 'Copy Link'} onClick={handleCopy} />
          <ControlButton icon={<BookMarkIcon />} name={saveSuccess ? 'Saved!' : 'Save'} onClick={handleSave} />
          <ControlButton icon={<ResetIcon />} name="Reset" onClick={handleReset} />
          <ControlButton icon={<ClockIcon />} name="History" onClick={handleHistory} />
          {totalGpa === null ? null : (
            <ControlButton icon={<ClipboardIcon />} name="Copy Results" onClick={() => handleCopyResults()} />
          )}
        </div>

        <div className="control-bar-buttons right-side">
          <div className="total-semesters">{semesters.length}</div>
        </div>
        <Popup
          title="History"
          content={
            history.length === 0 ? (
              <div className="not-found-msg">Nothing Saved!</div>
            ) : (
              history.map((item, index) => (
                <div className="popup-item" key={index}>
                  <div className="popup-item-info" onClick={() => handleSelect(item)}>
                    {item.semesters.length === 1
                      ? item.semesters.length + ' Semester'
                      : item.semesters.length + ' Semesters'}
                  </div>
                  <div className="popup-item-left-side">
                    <div className="popup-item-date" onClick={() => handleSelect(item)}>
                      {handleDate(item.date)}
                    </div>
                    <div className="popup-item-remove" onClick={() => handleRemove(index)}>
                      <CloseSquare />
                    </div>
                  </div>
                </div>
              ))
            )
          }
          buttons={
            history.length !== 0 && (
              <div className="popup-button" onClick={() => setHistory([])}>
                <ResetIcon />
              </div>
            )
          }
          isOpened={historyPopupIsOpened}
          setIsOpened={setHistoryPopupIsOpened}
        />

        <Popup
          title="Results"
          content={
            copiedSemesters === null ? (
              <div className="not-found-msg">Nothing copied!</div>
            ) : (
              <pre className="result-text">{copiedSemesters}</pre>
            )
          }
          buttons={
            <>
              <div
                className="popup-button"
                onClick={() => {
                  navigator.clipboard.writeText(copiedSemesters);
                }}>
                <ClipboardIcon />
              </div>
            </>
          }
          isOpened={resultsPopupIsOpened}
          setIsOpened={setResultsPopupIsOpened}
        />
      </div>
    </div>
  );
};

export default ControlBar;
