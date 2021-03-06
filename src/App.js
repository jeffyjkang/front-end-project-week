import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ListView from "./components/views/listview";
import CreateNote from "./components/views/createnote";
import NoteView from "./components/views/noteview";
import EditNote from "./components/views/editnote";
import DeleteNote from "./components/functions/deletenote";
import { MainBack } from "./ReusableStyles";
import { Container } from "reactstrap";
import { Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: 0,
          tags: ["tag", "otherTag"],
          title: "Note Title 0",
          textBody: "Note Body 0"
        },
        {
          id: 1,
          tags: ["tag", "otherTag"],
          title: "Note Title 1",
          textBody: "Note Body 1"
        },
        {
          id: 2,
          tags: ["tag", "otherTag"],
          title: "Note Title 2",
          textBody: "Note Body 2"
        }
      ],
      selected: [],
      filter: []
    };
  }

  componentDidMount() {
    axios
      .get("https://protected-cliffs-25818.herokuapp.com/notes")
      .then(response => {
        this.setState({ notes: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  editNoteHandler = e => {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitNote = () => {
    // const notes = this.state.notes.slice();
    // let notes = this.state.notes;
    // notes.push({
    //   id: this.state.notes.length,
    //   title: this.state.title,
    //   textBody: this.state.textBody
    // });
    // this.setState({ notes, title: "", textBody: "" });
    const note = {
      title: this.state.title,
      textBody: this.state.textBody
    };
    axios
      .post("https://protected-cliffs-25818.herokuapp.com/notes", note)
      .then(response => {
        console.log("response", response);
        this.setState(
          {
            notesData: response.data,
            title: "",
            textBody: ""
          },
          this.componentDidMount()
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  selectHandler = note => {
    this.setState({ selected: note });
  };

  filterNote = () => {
    // let filteredNote = this.state.notes.slice();
    // filteredNote = filteredNote.filter(
    //   filtered => filtered.notes === this.state.selected
    // );
    return this.state.selected;
  };

  editSubmitHandler = () => {
    // let editNote = this.state.selected;
    // editNote.title = this.state.title;
    // editNote.textBody = this.state.textBody;
    // this.setState({
    //   title: editNote.title,
    //   textBody: editNote.textBody
    // });
    // return editNote;
    let editNote = this.state.selected;
    editNote.title = this.state.title;
    editNote.textBody = this.state.textBody;
    console.log(editNote, "editnote");
    axios
      .put(
        `https://protected-cliffs-25818.herokuapp.com/notes/${
          this.state.selected.id
        }`,
        editNote
      )
      .then(response => {
        this.setState({
          title: "",
          textBody: ""
        });
        return editNote;
      });
  };

  submitDelete = () => {
    // let notes = this.state.notes.slice();
    // notes = notes.filter(filtered => filtered.id !== this.state.selected.id);
    // this.setState({ notes: notes });
    let notes = this.state.notes.slice();
    let note = notes.filter(filtered => filtered.id === this.state.selected.id);
    console.log(note, "notes");
    axios
      .delete(
        `https://protected-cliffs-25818.herokuapp.com/notes/${
          this.state.selected.id
        }`
      )
      .then(response => {
        console.log(response, "response");
        this.setState(
          {
            notesData: response.data,
            title: "",
            textBody: ""
          },
          this.componentDidMount()
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  filterSearch = event => {
    let notes = this.state.notes.slice();
    notes = this.state.notes.filter(notes => {
      if (notes.title.includes(event.target.value)) {
        return notes;
      }
    });
    this.setState({ filter: notes });
  };

  render() {
    return (
      <MainBack>
        <Container fluid>
          <header className="App-header">
            <h1 className="App-title">Lambda Notes Front-End-Project</h1>
          </header>
          {/* <ListView
            notes={this.state.notes}
            selectHandler={this.selectHandler}
            selectedNote={this.state.selected}
          /> */}
          <Route
            exact
            path="/"
            render={props => (
              <ListView
                {...props}
                // notes={this.state.notes}
                notes={
                  this.state.filter.length > 0
                    ? this.state.filter
                    : this.state.notes
                }
                selectHandler={this.selectHandler}
                selectedNote={this.state.selected}
                //
                value={this.state.value}
                filterSearch={this.filterSearch}
              />
            )}
          />
          {/* <CreateNote
            notes={this.state.notes}
            editNoteHandler={this.editNoteHandler}
            handleSubmitNote={this.handleSubmitNote}
          /> */}
          <Route
            exact
            path="/create"
            render={props => (
              <CreateNote
                {...props}
                notes={this.state.notes}
                editNoteHandler={this.editNoteHandler}
                handleSubmitNote={this.handleSubmitNote}
              />
            )}
          />
          {/* <NoteView notes={this.filterNote()} /> */}
          <Route
            path="/note/:id"
            render={props => <NoteView {...props} notes={this.filterNote()} />}
          />
          {/* <EditNote
            notes={this.filterNote()}
            selectHandler={this.selectHandler}
            editNoteHandler={this.editNoteHandler}
            editSubmitHandler={this.editSubmitHandler}
          /> */}
          <Route
            exact
            path="/edit"
            render={props => (
              <EditNote
                {...props}
                notes={this.filterNote()}
                selectHandler={this.selectHandler}
                editNoteHandler={this.editNoteHandler}
                editSubmitHandler={this.editSubmitHandler}
              />
            )}
          />
          {/* <DeleteNote
            notes={this.filterNote()}
            sumbitDelete={this.submitDelete}
          /> */}
          <Route
            exact
            path="/note/delete"
            render={props => (
              <DeleteNote
                {...props}
                notes={this.filterNote()}
                submitDelete={this.submitDelete}
              />
            )}
          />
        </Container>
      </MainBack>
    );
  }
}

export default App;
