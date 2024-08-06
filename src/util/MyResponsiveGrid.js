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
                { id: '6', title: 'Any last words?.', content: "I'm an Imperial Citizen, I have rights!" },
                { id: '7', title: 'Strawberries are in season.', content: 'True Happiness stems only from Duty.' },
            ],
            layouts: {
                lg: [],
                md: [],
                sm: [],
                xs: [],
                xxs: []
            },
            newNoteContent: '',
            newNoteTitle: '',
        };
    }

    componentDidMount() {
        this.initializeLayouts();
    }

    initializeLayouts = () => {
        const layouts = this.generateLayouts(this.state.notes);
        this.setState({ layouts });
    };

    generateLayouts = (notes) => {
        const layout = notes.map((note, index) => ({
            i: note.id,
            x: (index % 2) * 2, // Adjust starting x position
            y: Math.floor(index / 2), // Adjust starting y position
            w: 2,
            h: 1,
            minW: 1,
            minH: 1,
        }));
        return { lg: layout, md: layout, sm: layout, xs: layout, xxs: layout };
    };

    handleNewNoteTitleChange = (event) => {
        this.setState({ newNoteTitle: event.target.value });
    };

    handleNewNoteChange = (event) => {
        this.setState({ newNoteContent: event.target.value });
    };

    handleAddNote = () => {
        const { notes, newNoteContent, newNoteTitle, layouts } = this.state;
        const newNote = {
            id: (notes.length + 1).toString(),
            title: newNoteTitle,
            content: newNoteContent,
        };
        const updatedNotes = [...notes, newNote];

        const newLayout = {
            i: newNote.id,
            x: (notes.length % 2) * 2, // Place new note on the next column
            y: Math.floor(notes.length / 2), // Place new note on the next row
            w: 2,
            h: 1,
            minW: 1,
            minH: 1,
        };

        // Append the new layout
        const updatedLayouts = {
            lg: [...layouts.lg, newLayout],
            md: [...layouts.md, newLayout],
            sm: [...layouts.sm, newLayout],
            xs: [...layouts.xs, newLayout],
            xxs: [...layouts.xxs, newLayout],
        };

        this.setState({
            notes: updatedNotes,
            layouts: updatedLayouts,
            newNoteContent: '',
            newNoteTitle: ''
        });
    };

    handleDeleteNote = (noteId) => {
        const { notes, layouts } = this.state;
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        const updatedLayouts = {
            lg: layouts.lg.filter(layout => layout.i !== noteId),
            md: layouts.md.filter(layout => layout.i !== noteId),
            sm: layouts.sm.filter(layout => layout.i !== noteId),
            xs: layouts.xs.filter(layout => layout.i !== noteId),
            xxs: layouts.xxs.filter(layout => layout.i !== noteId),
        };

        this.setState({
            notes: updatedNotes,
            layouts: updatedLayouts
        });
    };

    handleLayoutChange = (layout, layouts) => {
        this.setState({ layouts });
    };

    render() {
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
                    layouts={this.state.layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    onLayoutChange={this.handleLayoutChange}
                    isResizable={true}
                >
                    {this.state.notes.map((note) => (
                        <div key={note.id}>
                            <div className="flex-container">
                                <div className='Container-card-title'>
                                    <div className='cardTitle'>
                                        {note.title}
                                    </div>
                                    <div className='deletebuttondiv'>
                                        <button
                                            className='deletebutton'
                                            onClick={() => this.handleDeleteNote(note.id)}>
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='cardContent'>
                                <div className="scalable-text-wrapper">
                                    <div className="scalable-text">
                                        <p>{note.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        );
    }

}

export default MyResponsiveGrid;

