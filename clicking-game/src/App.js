import React from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";
import "./App.css";
import { runInThisContext } from "vm";


class App extends React.Component {
  state = {
    friends: friends,
    clicked: [],
    score: 0,
    highScore: 0
  };

  handleClick(id){
    if(this.state.clicked.indexOf(id) === -1){
      let newClicked = this.state.clicked;
      newClicked.push(id);
      let newScore = this.state.score + 1;
      let newHighScore = this.state.highScore;
      if(newScore > newHighScore){
        newHighScore = newScore;
      }
      this.setState({
        score: newScore,
        highScore: newHighScore,
        clicked: newClicked
      });
    }else{
      this.setState({
        score: 0,
        clicked: []
      })
    }
    this.handleShuffle();
  }

  handleShuffle() {
    this.setState({
      friends: friends.sort(() => Math.random() - 0.5)
    });
  }

  render(){ 
    return(
    <Wrapper>
      <h3>Score: {this.state.score} - High Score: {this.state.highScore}</h3>
      <h1 className="title">Friends List</h1>
      {friends.map(f => (
        <FriendCard
          name={f.name} 
          image={f.image}
          occupation={f.occupation}
          location={f.location}
          ClickHandler={() => this.handleClick(f.id)}
        />
      ))}
    </Wrapper>
  )};
}

export default App;
