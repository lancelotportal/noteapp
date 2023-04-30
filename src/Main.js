import ReactMarkdown from 'react-markdown';

const Main = ({ activeNote, onNoteUpdate }) => {

    const onEditField = (key, value) => {

        onNoteUpdate({
            ...activeNote,
            [key]: value,
            lastModified: Date.now(),
        });
    }

    if (!activeNote) {
        return (
            <div className="no-active-note">No active note. Select one and start typing !</div>
        );
    }

    return (
        <div className="app-main">
            <div className="app-main-note-edit">
                <input 
                    type="text" 
                    id="title" 
                    value={activeNote.title} 
                    onChange={(e) => onEditField("title", e.target.value)} 
                    autoFocus 
                    placeholder="Note title"
                />
                <textarea 
                    id="body" 
                    value={activeNote.body} 
                    onChange={(e) => onEditField("body", e.target.value)} 
                    placeholder="Begin your note here..."
                />
            </div>

            <div className="app-main-note-preview">
                <h1 className="preview-title">{activeNote.title}</h1>
                <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
            </div>
        </div>
    )
}

export default Main;