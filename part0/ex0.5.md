```mermaid
sequenceDiagram
    participant browser
    participant server
    Note right of browser: JS adds new note object to local list
    Note right of browser: JS re-renders the note list on the page (UI updated)
    Note right of browser: JS sends the new note data asynchronously to server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Payload: { content: "...", date: "..." } as JSON
    server-->>browser:  HTTP status code 201
    deactivate server