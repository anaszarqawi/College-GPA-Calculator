import React from 'react';
import './style.scss';
import { useCalc } from '../../../../contexts/calcContext';
import ControlButton from './ControlButton';
import { ReactComponent as ClipboardIcon } from '../../../../assets/svg/clipboard-icon.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/svg/plus-icon.svg';
import { ReactComponent as ClockIcon } from '../../../../assets/svg/clock-icon.svg';
import { ReactComponent as BookMarkIcon } from '../../../../assets/svg/bookmark-icon.svg';
import Popup from '../../../Popup/Popup';

import axios from 'axios';
const ControlBar = () => {
  const { semesters, setSemesters, grades, calculateGPA } = useCalc();

  const [copySuccess, setCopySuccess] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [popupIsOpened, setPopupIsOpened] = React.useState(false);

  React.useEffect(() => {
    const history = localStorage.getItem('history');
    if (history) {
      setHistory(JSON.parse(history));
    }
  }, []);

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
    setPopupIsOpened(!popupIsOpened);
  };

  return (
    <div className="control-bar">
      <div className="control-bar-buttons left-side">
        <ControlButton
          icon={<PlusIcon />}
          name={semesters.length !== 20 ? 'New Semester' : 'Max Semesters!'}
          onClick={semesters.length !== 20 ? handleAddSemester : null}
        />
        <ControlButton icon={<ClipboardIcon />} name={copySuccess ? 'Copied!' : 'Copy Link'} onClick={handleCopy} />
        <ControlButton icon={<BookMarkIcon />} name={saveSuccess ? 'Saved!' : 'Save'} onClick={handleSave} />
      </div>
      <div className="control-bar-buttons right-side">
        <ControlButton icon={<ClockIcon />} name="History" onClick={handleHistory} />
      </div>
      <Popup
        title="History"
        content={history.map((item, index) => (
          <div
            className="popup-item"
            key={index}
            onClick={() => {
              setSemesters(item.semesters);
              setPopupIsOpened(!popupIsOpened);
            }}>
            <div className="popup-item-date">{handleDate(item.date)}</div>
            <div className="popup-item-grades">
              {item.semesters.length === 1 ? item.semesters.length + ' Semester' : item.semesters.length + ' Semesters'}
            </div>
          </div>
        ))}
        isOpened={popupIsOpened}
        setIsOpened={setPopupIsOpened}
      />
    </div>
  );
};

export default ControlBar;
