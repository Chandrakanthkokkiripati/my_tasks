import './index.css'

const Task = props => {
  const {tag, onClickTag, isActive} = props
  const {displayText, optionId} = tag
  const active = isActive ? 'active' : ''

  return (
    <li>
      <button
        onClick={() => onClickTag(optionId)}
        className={`tag-button ${active}`}
        type="button"
      >
        {displayText}
      </button>
    </li>
  )
}

export default Task
