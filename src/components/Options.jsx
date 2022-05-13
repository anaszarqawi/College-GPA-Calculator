export default function Options() {
    return (
        <div>
        <div id="options-title">
            <span>Options</span>
            <div className="slide">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439.32 244.66">
                <path className="cls-1" d="M532.53,455.29a24.91,24.91,0,0,1,17.68,7.33L744.87,657.28a25,25,0,0,1-35.36,35.35l-177-177-177,177a25,25,0,0,1-35.35-35.35L514.85,462.62A24.89,24.89,0,0,1,532.53,455.29Z" transform="translate(-312.87 -455.29)" />
            </svg>
            </div>
        </div>
        <div id="options-section">
            <div id="section">
            <p>Grade Format : </p>
            <div id="format">
                <form>
                <label>
                    <input type="radio" name="format" id="Letter" defaultChecked />
                    <span>Letter</span>
                </label>
                <label>
                    <input type="radio" name="format" id="percentage" />
                    <span>percentage</span>
                </label>
                <label>
                    <input type="radio" name="format" id="Point_Value" />
                    <span>Point Value</span>
                </label>
                </form>
            </div>
            </div>
        </div>
        </div>

    )
}