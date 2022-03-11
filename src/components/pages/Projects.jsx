import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard";

import styles from './Projects.module.css'
import { useState, useEffect } from "react";

function Projects() {
    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setProjects(data)
        })
        .catch((err) => console.log(err))
    }, [])

    return ( 
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/' text='Criar Projeto'/>
            </div>
            {message && <Message type='success' msg={message} />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard name={project.name} id={project.id} budget={project.budget} category={project.category.name} key={project.id}/>
                    ))
                }
            </Container>
            
        </div>
     );
}

export default Projects;