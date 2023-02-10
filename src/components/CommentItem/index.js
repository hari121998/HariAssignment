import './index.css'

const CommentItem = props => {
  const {commentsItem} = props
  const {at, author, like, reply, text} = commentsItem
  const newDate = new Date(at)
  const month = newDate.getMonth() + 1
  const day = newDate.getDate() - 1
  const year = newDate.getFullYear()

  const value = `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`

  return (
    <li className="comments-item-con">
      <p className="at-item">{value}</p>
      <p className="author-item">{author}</p>
      <p className="likes-item">{like}</p>
      <p className="reply-item">{reply}</p>
      <p className="text-item">{text}</p>
    </li>
  )
}

export default CommentItem
