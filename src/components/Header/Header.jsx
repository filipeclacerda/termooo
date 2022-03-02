import "./header.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
  return (
    <div className="header">
        <div className="container">
            <div className="left">
                <div className="icon">
                    <KeyboardArrowDownIcon className="arrow"/>
                </div>
                <div className="icon">
                    <QuestionMarkIcon className="question"/>
                </div>
            </div>
            <div className="title">
            <h1>TERMO</h1>
            </div>
            <div className="right">
                <div className="icon">
                    <BarChartIcon className="bar"/>
                </div>
                <div className="icon">
                    <SettingsIcon className="settings"/>
                </div>
            </div>
        </div>
    </div>
  )
}
