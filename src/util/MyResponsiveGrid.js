import React from 'react';

import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

class MyResponsiveGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                { id: '1', title: 'Let it go.', content: 'Is this a real life, or just some fantasy?' },
                { id: '2', title: 'Star Trek is geeky..', content: 'Maitoa, kanaa, perunoita' },
                { id: '3', title: "I'm lost on what we’re talking about.", content: 'react-grid-layout' },
                { id: '4', title: 'I do not like aquariums.', content: 'Faith without deeds is worthless.' },
                { id: '5', title: 'It was a misunderstanding.', content: 'Snakes in the plane!' },
                { id: '6', title: 'It’s as dry as a bone.', content: "I'm an Imperial Citizen, I have rights!" },
                { id: '7', title: 'Strawberries are in season.', content: 'True Happiness stems only from Duty.' },
            ],
            newNoteContent: '',
            newNoteTitle: '',
        };
    }

    handleNewNoteTitleChange = (event) => {
        this.setState({ newNoteTitle: event.target.value });
    };
    handleNewNoteChange = (event) => {
        this.setState({ newNoteContent: event.target.value });
    };

    handleAddNote = () => {
        const { notes, newNoteContent, newNoteTitle } = this.state;
        const newNote = {
            id: (notes.length + 1).toString(),
            title: newNoteTitle,
            content: newNoteContent,
        };
        const updatedNotes = [...notes, newNote];
        this.setState({ notes: updatedNotes, newNoteContent: '', newNoteTitle: '' });
    };

    handleDeleteNote = (noteId) => {
        const { notes } = this.state;
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        this.setState({ notes: updatedNotes });
    };

    render() {
        const layouts = {
            lg: this.state.notes.map((note) => ({
                i: note.id,
                x: 0,
                y: 2,
                w: 2, // Width of the card
                h: 1, // Height of the card
                minW: 1, // Minimum width of the card
                minH: 1, // Minimum height of the card
            })),
            md: [], // Your layout configuration for "md" breakpoint
            sm: [], // Your layout configuration for "sm" breakpoint
            xs: [], // Your layout configuration for "xs" breakpoint
            xxs: [], // Your layout configuration for "xxs" breakpoint
        };

        return (
            <div>

                <div>
                    <input
                        type="text"
                        value={this.state.newNoteTitle}
                        placeholder="Title"
                        onChange={this.handleNewNoteTitleChange}
                    />
                    <br />
                    <input
                        type="text"
                        value={this.state.newNoteContent}
                        placeholder="Content"
                        onChange={this.handleNewNoteChange}
                    />
                    <br />
                    <button onClick={this.handleAddNote}>Add Card</button>
                </div>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                >
                    {this.state.notes.map((note) => (
                        <div key={note.id}>
                            <div className="flex-container">
                                <div className='Container-card-title'>
                                    <div className='cardTitle' >
                                        {note.title}
                                    </div>
                                    <div className='deletebuttondiv' >
                                        <button
                                            className='deletebutton'
                                            onClick={() => this.handleDeleteNote(note.id)}>
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='cardContent' >
                                <p>{note.content}</p>
                            </div>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        );
    }
}

export default MyResponsiveGrid;