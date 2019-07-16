import React, { useEffect, useState } from 'react'
import { Card, CardActionArea, Typography, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4)
  },
  title: {
    margin: theme.spacing(2)
  }
}));

export default function ProjectCard(props) {
  const classes = useStyles();
  const [fade, setFade] = useState(false)

  const toUser = () => {
    window.location = props.html_url
  }

  useEffect(() => {
    setFade(true)
  }, [fade]);

  return (
    <Fade in={fade} timeout={1000}>
      <Card className={classes.root}>
        <CardActionArea onClick={toUser}>
          <Typography className={classes.title} color="primary" variant="h4">
            {props.name}
          </Typography>
          <Typography className={classes.title} color="textPrimary" variant="h6">
            {props.description}
          </Typography>

          {props.language ?
          <Typography className={classes.title} color="textSecondary" variant="subtitle1">
            {`Language: ${props.language}`}
          </Typography>
          : <></>
          }
        </CardActionArea>
      </Card>
    </Fade>
  )
}
