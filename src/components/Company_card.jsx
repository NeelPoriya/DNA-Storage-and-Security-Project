import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import Draggable from 'react-draggable';


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function MediaCard({company}) {

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  }

  return (
    <>
    <Card sx={{ maxWidth: 345, margin: "16px", bgcolor: "#bbdefb", display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {company.Organization}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company.Description.split(' ').slice(0, 15).join(' ') + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setDialogOpen(true)}>Read More</Button>
      </CardActions>
    </Card>
    <Dialog
        open={dialogOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {company.Organization}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {company.Description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
