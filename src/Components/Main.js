import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, TextField, Button, Divider, Grid, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ProjectCard from './ProjectCard'
import UserCard from './UserCard'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  fieldRoot: {
    margin: theme.spacing(4)
  },
  displayRoot: {
    margin: theme.spacing(4)
  },
  field: {
    margin: theme.spacing(2)
  },
  text: {
    fontFamily: "'Literata', serif",
  },
  textMargin: {
    fontFamily: "'Literata', serif",
    margin: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  vertCenter: {
    verticalAlign: 'center'
  }
}));

export default function Main() {
  const classes = useStyles();
  const [field, setField] = useState("CloudNineK")
  const [user, setUser] = useState({})
  const [projects, setProjects] = useState([])

  const [projectCards, setProjCards] = useState([])
  const [userCard, setUserCard] = useState([])

  useEffect(() => {
    setProjCards(projects.map(proj => <ProjectCard {...proj} key={proj.id}/>))
    setUserCard(<UserCard {...user} key={user.id}/>)
  }, [projects, user]);

  useEffect(() => {
    pull()
  }, [])

  const getProjects = () => {
    fetch(`https://api.github.com/users/${field}/repos`)
      .then(response => response.json())
      .then(out => {
        setProjects(out)
      })
  }

  const getUser = () => {
    fetch(`https://api.github.com/users/${field}`)
      .then(response => {
        console.log(response.status); 
        if (response.status !== 200) {
          return
        }
        return response.json()
      })
      .then(out => {
        console.log(out)
        if (out) {
          setUser(out)
          getProjects()
        }
      })
  }

  const pull = () => {
    getUser()
  }

  return (
    <div>

      {/* Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography className={classes.text} variant="h6" color="inherit">
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.fieldRoot}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
          {/* Header + Form */}
            <div>
              <Typography className={classes.textMargin} variant="h2">
                GitSummary
              </Typography>
              <Typography className={classes.textMargin} color="textSecondary" variant="h4">
                View a user's github projects
              </Typography>

              <TextField
                className={classes.field}
                label="Github Username"
                placeholder="CloudNineK"
                margin="normal"
                onChange={e => setField(e.target.value)}/>

              <Button 
                variant="contained" 
                onClick={pull}
                className={classes.button}>
                  View
              </Button>
            </div>
          </Grid>

          <Grid item xs={6}>
            {user.name ? userCard : []}
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle"/>

      {/* User Information*/}

      {/* Project Display */}
      {projectCards}
 
    </div>
  )
}
