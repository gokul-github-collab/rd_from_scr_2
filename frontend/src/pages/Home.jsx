import React, { useEffect, useState } from 'react'
import api from '../api'
import Note from '../components/Note'

const Home = () => {
    const [notes, setNotes] = useState([]) 
    const [title, setTitle] = useState("")
    const [content, setContent]  = useState("")

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes/").
        then((res) => res.data).
        then((data)=> setNotes(data)). 
        catch((err)=>alert(err))
    } 

    const deleteNote = (id) =>{
        api.delete(`/api/notes/delete/${id}/`).
        then((res) => {

            if(res.status === 204) alert("Note deleted")
            else alert("Error deleting note")
            getNotes()
        }).catch((err) => alert(err))

    }

    const createNote = (e) => {
        e.preventDefault()
        api.post(`/api/notes/`, {content, title}).
        then((res) => {
            if(res.status === 201) alert("Note Created")
            else alert("Failed to creae note")

        }).catch((err) => alert(err))
        getNotes()
    }
    return (
    <>
    
    <h1>Notes</h1>

        {notes.map((note)=>(
            <Note note={note} onDelete={deleteNote} key={note.id}/>
        ))}
    
    <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />
                <label htmlFor="content">Content:</label> <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>

    
    
    </>
  )
}

export default Home