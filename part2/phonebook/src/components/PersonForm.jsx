const PersonForm = ({
    onSubmit,
    newName,
    handleNewNameChange,
    newNumber,
    handleNewNumberChange
}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={newName} onChange={handleNewNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNewNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm