import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardActionArea, Typography, CardMedia, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 256
  },
  title: {
    margin: theme.spacing(2)
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  pfp: {
    minWidth: 256,
  },
  content: {
    flexGrow: 1
  }
}));

export default function Project(props) {
  const classes = useStyles();
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setFade(true)
  }, [fade]);

  const toUser = () => {
    window.location = props.html_url
  }

  return (
    <Fade in={fade} timeout={1000}>
      <Card className={classes.root}>
        <CardActionArea onClick={toUser}>
          <CardContent>
            <Typography className={classes.title} variant="h4">
              {props.name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" variant="h5">
              {props.bio}
            </Typography>
            <Typography className={classes.title} color="textSecondary" variant="h5">
              {props.location}
            </Typography>
          </CardContent>

        </CardActionArea>
          <CardMedia
            image={props.avatar_url}
            className={classes.pfp}/>
      </Card>
    </Fade>
  )
}
