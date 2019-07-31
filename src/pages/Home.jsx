import React from 'react';
import axios from 'axios';
import { Button, Input, Row, Col } from 'antd';


function Book(props) {
  return <div>
    <h2>{props.title}</h2>
    <h2>{props.message}</h2>
    <h2>{props.author}</h2>
    <h2>{props.url}</h2>
  </div>
};
export default class Home extends React.Component {
  
  _bookTitleInput = React.createRef();
  _bookMessageInput = React.createRef();
  _bookAuthorInput = React.createRef();
  _bookUrlInput = React.createRef();
  state = {
    books : []
  }

  async componentDidMount() {
    const {token} = this.props;
    try {
        const response = await axios.get('https://api.marktube.tv/v1/book', {
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
      
        this.setState({books :response.data});
    } catch(error) {
      console.log(error);
    }
  }
  render() {
    const {books} = this.state;
    return (
      <Row>
        <Col span={6}/>
        <Col span={12} align="middle" >
          <h1>HOME</h1>
          <Button onClick={this._click}>Logout</Button>
          <Input placeholder={"책이름"} ref={this._bookTitleInput} style={{marginTop: 30}}></Input>
          <Input placeholder={"감상평"} ref={this._bookMessageInput} style={{marginTop: 10}}></Input>
          <Input placeholder={"지은이"} ref={this._bookAuthorInput} style={{marginTop: 10}}></Input>
          <Input placeholder={"url"} ref={this._bookUrlInput} style={{marginTop: 10}}></Input>
          <Button onClick={this._bookAddClick} type="primary" style={{width: "90vh", marginTop: 20}}>책 등록</Button>
          {books.map(book => (
            <>
            <Book {...book} key={book.bookId} />
            </>
          ))}
        </Col>
        <Col span={6}/>
      </Row>
    )
  }

  _bookAddClick = async() => {
    const bookTitle = this._bookTitleInput.current.state.value;
    const bookMessage = this._bookMessageInput.current.state.value;
    const bookAuthor = this._bookAuthorInput.current.state.value;
    const bookUrl = this._bookUrlInput.current.state.value;
  
    const {token} = this.props;
    try {
      const response = await axios.post('https://api.marktube.tv/v1/book', {
        title : bookTitle,
        message : bookMessage,
        author : bookAuthor,
        url : bookUrl
       }, 
      {headers: {
        Authorization : `Bearer ${token}`
      }});
      console.log('👉 Returned data:', response);
      window.location.reload();
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
      

  }

  _click = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
