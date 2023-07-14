import React from 'react';
import './App.css';
import "./css/styles.css";
import "./examples/example-styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";


const ResponsiveGridLayout = WidthProvider(Responsive);

class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function () { }
  }
}

class MyResponsiveGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [
        { id: "1", content: "Note 1: Is this a real life, or just some fantasy?" },
        { id: "2", content: "Note 2: Maitoa, kanaa, perunoita" },
        { id: "3", content: "Note 3: react-grid-layout" }
      ],
      newNoteContent: ""
    };
  }
  handleNewNoteChange = event => {
    this.setState({ newNoteContent: event.target.value });
  }

  handleAddNote = () => {
    const { notes, newNoteContent } = this.state;
    const newNote = {
      id: (notes.length + 1).toString(),
      content: newNoteContent
    };
    const updatedNotes = [...notes, newNote];
    this.setState({ notes: updatedNotes, newNoteContent: "" })
  }
  handleDeleteNote = (noteId) => {
    const { notes } = this.state;
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  render() {
    // {lg: layout1, md: layout2, ...}
    var layouts = new LocalStorageLayout();

    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.newNoteContent}
            onChange={this.handleNewNoteChange}
          />
          <button onClick={this.handleAddNote}>Add Note</button>
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {this.state.notes.map(note => (
            <div key={note.id}>
              <button onClick={() => this.handleDeleteNote(note.id)}>Delete</button>
              <p>
                {note.content}
              </p>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>

    );
  }
}

function App() {
  return (
    <div className="App">

      <p>Take notes.</p>

      <MyResponsiveGrid />

    </div>
  );
}

export default App;
