import React from 'react';
import { useCalc } from '../../contexts/calcContext';
import { useScrollPosition } from '../../contexts/useScrollPosition';
import ControlButton from './ControlButton';
import ClipboardIcon from '../../assets/svg/clipboard-icon';
import LinkIcon from '../../assets/svg/link-icon';
import PlusIcon from '../../assets/svg/plus-icon';
import ClockIcon from '../../assets/svg/clock-icon';
import BookMarkIcon from '../../assets/svg/bookmark-icon';
import ResetIcon from '../../assets/svg/x-square';
import CloseSquare from '../../assets/svg/Close-Square';

import Popup from '../Popup';

import axios from 'axios';
import EditIcon from '../../assets/svg/edit-icon';

const ControlBar = (props) => {
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
    showMsg,
  } = useCalc();

  const [copySuccess, setCopySuccess] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [editModeHistory, setEditModeHistory] = React.useState(false);
  const [historyPopupIsOpened, setHistoryPopupIsOpened] = React.useState(false);

  React.useEffect(() => {
    const history = localStorage.getItem('history');
    if (history) {
      setHistory(JSON.parse(history));
    }
  }, []);

  const [isFloatOnScroll, setIsFloatOnScroll] = React.useState(false);

  React.useEffect(() => {
    setEditModeHistory(false);
  }, [historyPopupIsOpened]);

  React.useEffect(() => {
    if (history.length === 0) setEditModeHistory(false);
  }, [history]);

  useScrollPosition(
    ({ currPos }) => {
      const isShow = currPos.y < 150;
      if (isShow !== isFloatOnScroll) setIsFloatOnScroll(isShow);
    },
    [isFloatOnScroll]
  );

  const handleCopy = async () => {
    const URL = window.location.href;
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(URL);
      showMsg('success', 'Results Link Copied 😉');
    } else {
      document.execCommand('copy', true, URL);
      showMsg('success', 'Results Link Copied 😉');
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
    showMsg('success', 'Results saved successfully!');
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

  const copySemesters = async () => {
    const URL = window.location.href;
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(copiedSemesters);
      showMsg('success', 'Results Copied 😉');
    } else {
      document.execCommand('copy', true, copiedSemesters);
      showMsg('success', 'Results Copied 😉');
    }
  };

  return (
    <div className={`control-bar ${isFloatOnScroll ? 'float-bar' : ''}`}>
      <div className="control-bar-container">
        <div className="control-bar-buttons left-side">
          <ControlButton
            icon={<PlusIcon />}
            name={semesters.length !== 20 ? 'New Semester' : 'Max Semesters!'}
            onClick={semesters.length !== 20 ? handleAddSemester : null}
          />
          <ControlButton icon={<LinkIcon />} name={copySuccess ? 'Copied!' : 'Copy Link'} onClick={handleCopy} />
          <ControlButton icon={<BookMarkIcon />} name={'Save'} onClick={handleSave} />
          <ControlButton icon={<ResetIcon />} name="Reset" onClick={handleReset} />
          <ControlButton icon={<ClockIcon />} name="History" onClick={handleHistory} />
          {totalGpa === null ? null : (
            <ControlButton icon={<ClipboardIcon />} name="Copy Results" onClick={() => handleCopyResults()} />
          )}
        </div>

        <div className="control-bar-buttons right-side">
          <div className="total-semesters">{semesters.length}</div>
        </div>
      </div>
      <Popup
        title={editModeHistory ? 'Reset' : 'History'}
        resetBtn={editModeHistory}
        setList={setHistory}
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
                  {editModeHistory && (
                    <div className="popup-item-remove" onClick={() => handleRemove(index)}>
                      <CloseSquare />
                    </div>
                  )}
                </div>
              </div>
            ))
          )
        }
        buttons={
          history.length !== 0 && (
            <div
              className={`popup-button ${editModeHistory ? 'active-button' : ''}`}
              onClick={() => setEditModeHistory(!editModeHistory)}>
              <EditIcon />
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
            <div className="popup-button" onClick={copySemesters}>
              <ClipboardIcon />
            </div>
          </>
        }
        isOpened={resultsPopupIsOpened}
        setIsOpened={setResultsPopupIsOpened}
      />
    </div>
  );
};

export default ControlBar;
