import {Component} from 'react'
import './index.css'
import CommentItem from '../CommentItem'

const pageList = [
  {id: 1, value: 25, displayText: '25 per Page'},
  {id: 2, value: 50, displayText: '50 per Page'},
  {id: 3, value: 100, displayText: '100 per Page'},
]

class CommentsData extends Component {
  state = {
    commentsData: [],
    selectValue: pageList[0].value,
    userValue: '',
    pagination: [],
    activePage: 1,
  }

  componentDidMount() {
    this.getCommentsData()
  }

  getCommentsData = async () => {
    const {selectValue} = this.state
    const apiUrl = 'https://dev.ylytic.com/ylytic/test'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const {comments} = data
      const totalComments = comments.length
      let endValue = 1
      if (totalComments > selectValue) {
        endValue = totalComments / selectValue
      }

      const numbers = this.getListOfNumbers([], 0, parseInt(endValue))
      this.setState({commentsData: comments, pagination: numbers})
    }
  }

  getUserFilterResults = () => {
    const {userValue, commentsData} = this.state
    const newUserValue = userValue.toLowerCase()
    const filteredResults = commentsData.filter(eachItem => {
      const newAuthor = eachItem.author.toLowerCase()
      const newText = eachItem.text.toLowerCase()
      return newAuthor.includes(newUserValue) || newText.includes(newUserValue)
    })
    return filteredResults
  }

  getListOfNumbers = (range = [], start = 0, end = 6) => {
    if (start < end) {
      range.push(start)
      const count = start + 1
      return this.getListOfNumbers(range, count, end)
    }
    return range
  }

  onChangeSearchItems = event => this.setState({userValue: event.target.value})

  onChangeSelectPage = event => {
    const {commentsData} = this.state
    const totalComments = commentsData.length
    let endValue = 1
    if (totalComments > parseInt(event.target.value)) {
      endValue = totalComments / parseInt(event.target.value)
    }

    const numbers = this.getListOfNumbers([], 0, parseInt(endValue))
    this.setState({
      selectValue: parseInt(event.target.value),
      pagination: numbers,
      activePage: 1,
    })
  }

  onClickNextPage = () => {
    this.setState(prevState => {
      const {activePage, pagination} = prevState
      if (activePage < pagination.length) {
        return {activePage: activePage + 1}
      }
      return {activePage}
    })
  }

  onClickPrevPage = () => {
    this.setState(prevState => {
      const {activePage} = prevState
      if (activePage > 1) {
        return {activePage: activePage - 1}
      }
      return {activePage}
    })
  }

  onClickDownDate = () => {
    this.setState(prevState => {
      const {commentsData} = prevState

      const ascendingSort = commentsData.sort((a, b) => {
        const firstDate = new Date(a.at)
        const secondDate = new Date(b.at)
        return firstDate <= secondDate ? -1 : 1
      })
      return {commentsData: ascendingSort}
    })
  }

  onClickUpDate = () => {
    this.setState(prevState => {
      const {commentsData} = prevState

      const ascendingSort = commentsData.sort((a, b) => {
        const firstDate = new Date(a.at)
        const secondDate = new Date(b.at)
        return firstDate >= secondDate ? -1 : 1
      })
      return {commentsData: ascendingSort}
    })
  }

  onClickDownAuthor = () => {
    this.setState(prevState => {
      const {commentsData} = prevState

      const ascendingSort = commentsData.sort((a, b) =>
        a.author <= b.author ? -1 : 1,
      )
      return {commentsData: ascendingSort}
    })
  }

  onClickUpAuthor = () => {
    this.setState(prevState => {
      const {commentsData} = prevState
      const ascendingSort = commentsData.sort((a, b) =>
        a.author >= b.author ? -1 : 1,
      )
      return {commentsData: ascendingSort}
    })
  }

  onClickDownText = () => {
    this.setState(prevState => {
      const {commentsData} = prevState

      const ascendingSort = commentsData.sort((a, b) =>
        a.text <= b.text ? -1 : 1,
      )
      return {commentsData: ascendingSort}
    })
  }

  onClickUpText = () => {
    this.setState(prevState => {
      const {commentsData} = prevState
      const ascendingSort = commentsData.sort((a, b) =>
        a.text >= b.text ? -1 : 1,
      )
      return {commentsData: ascendingSort}
    })
  }

  onClickDownLike = () => {
    this.setState(prevState => {
      const {commentsData} = prevState
      const ascendingSort = commentsData.sort((a, b) =>
        a.like <= b.like ? -1 : 1,
      )
      return {commentsData: ascendingSort}
    })
  }

  onClickUpLike = () => {
    this.setState(prevState => {
      const {commentsData} = prevState
      const ascendingSort = commentsData.sort((a, b) =>
        a.like >= b.like ? -1 : 1,
      )
      return {commentsData: ascendingSort}
    })
  }

  onClickDownReply = () => {
    this.setState(prevState => {
      const {commentsData} = prevState
      const ascendingSort = commentsData.sort((a, b) =>
        a.reply <= b.reply ? -1 : 1,
      )
      return {commentsData: ascendingSort}
    })
  }

  onClickUpReply = () => {
    this.setState(prevState => {
      const {commentsData} = prevState
      const ascendingSort = commentsData.sort((a, b) =>
        a.reply >= b.reply ? -1 : 1,
      )
      return {commentsData: ascendingSort}
    })
  }

  onClickPageBtn = event =>
    this.setState({activePage: parseInt(event.target.value)})

  renderPageBtnContainer = () => {
    const {pagination, activePage} = this.state

    return (
      <>
        <button
          className={`page-btn ${activePage === 1 ? 'no-click' : ''}`}
          onClick={this.onClickPageBtn}
          type="button"
          value="1"
        >
          First
        </button>
        <button
          className={`page-btn ${activePage === 1 ? 'no-click' : ''}`}
          type="button"
          onClick={this.onClickPrevPage}
        >{`<<`}</button>
        {pagination.map(eachItem => (
          <button
            type="button"
            className={`page-btn ${
              activePage === eachItem + 1 ? 'active-page-no' : ''
            }`}
            value={eachItem + 1}
            onClick={this.onClickPageBtn}
          >
            {eachItem + 1}
          </button>
        ))}
        <button
          className={`page-btn ${
            activePage === pagination.length ? 'no-click' : ''
          }`}
          type="button"
          onClick={this.onClickNextPage}
        >{`>>`}</button>

        <button
          className={`page-btn ${
            activePage === pagination.length ? 'no-click' : ''
          }`}
          onClick={this.onClickPageBtn}
          type="button"
          value={pagination.length}
        >
          Last
        </button>
      </>
    )
  }

  render() {
    const {selectValue, commentsData, userValue, activePage} = this.state
    const startIndex = (activePage - 1) * selectValue
    const endIndex = startIndex + selectValue
    const filterResults = this.getUserFilterResults()
    return (
      <div className="bg-container">
        <h1>Ylytic - Assignment</h1>
        <div className="search-select-input-container">
          <div className="search-container">
            <input
              onChange={this.onChangeSearchItems}
              value={userValue}
              type="search"
              placeholder="Search Author or Text"
            />
          </div>

          <div className="select-page-container">
            <select value={selectValue} onChange={this.onChangeSelectPage}>
              {pageList.map(eachPage => (
                <option value={eachPage.value} key={eachPage.id}>
                  {eachPage.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="page-and-total-container">
          <p>
            Total Comments : <span>{commentsData.length}</span>
          </p>
          <div>{this.renderPageBtnContainer()}</div>
        </div>
        <div className="table-overflow-x">
          <p className="scroll">{`<--- scroll --->`}</p>
          <div className="entire-comments-table-con">
            <ul className="comments-table-con">
              <li className="header-con">
                <div className="at-item">
                  <p>At</p>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickDownDate}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963683/icons8-downwards-button-16_j8mklh.png"
                      alt="descending"
                    />
                  </button>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickUpDate}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963675/icons8-upwards-button-16_toq8az.png"
                      alt="ascending"
                    />
                  </button>
                </div>
                <div className="author-item">
                  <p>Author</p>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickDownAuthor}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963683/icons8-downwards-button-16_j8mklh.png"
                      alt="descending"
                    />
                  </button>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickUpAuthor}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963675/icons8-upwards-button-16_toq8az.png"
                      alt="ascending"
                    />
                  </button>
                </div>
                <div className="likes-item">
                  <p>Likes</p>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickDownLike}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963683/icons8-downwards-button-16_j8mklh.png"
                      alt="descending"
                    />
                  </button>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickUpLike}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963675/icons8-upwards-button-16_toq8az.png"
                      alt="ascending"
                    />
                  </button>
                </div>
                <div className="reply-item">
                  <p>Reply</p>

                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickDownReply}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963683/icons8-downwards-button-16_j8mklh.png"
                      alt="descending"
                    />
                  </button>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickUpReply}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963675/icons8-upwards-button-16_toq8az.png"
                      alt="ascending"
                    />
                  </button>
                </div>
                <div className="text-item">
                  <p>Text</p>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickDownText}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963683/icons8-downwards-button-16_j8mklh.png"
                      alt="descending"
                    />
                  </button>
                  <button
                    className="up-and-down-btn"
                    type="button"
                    onClick={this.onClickUpText}
                  >
                    <img
                      src="https://res.cloudinary.com/dnddnchcm/image/upload/v1675963675/icons8-upwards-button-16_toq8az.png"
                      alt="ascending"
                    />
                  </button>
                </div>
              </li>
            </ul>
            <ul className="comments-table-con comments-list">
              {filterResults.slice(startIndex, endIndex).map(eachItem => (
                <CommentItem commentsItem={eachItem} key={eachItem.at} />
              ))}
            </ul>
          </div>
        </div>
        <div className="page-con">{this.renderPageBtnContainer()}</div>
      </div>
    )
  }
}

export default CommentsData
