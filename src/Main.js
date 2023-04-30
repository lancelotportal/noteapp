const Main = ({ activeNote }) => {
    return (
        <div className="app-main">
            <div className="app-main-note-edit">
                <input type="text" id="title" autoFocus placeholder="Note title" />
                <textarea id="body" placeholder="Begin your note here..."/>
            </div>

            <div className="app-main-note-preview">
                <h1 className="preview-title">{activeNote.title}</h1>
                <div className="markdown-preview">{activeNote.body}</div>
            </div>
        </div>
    )
}

export default Main;