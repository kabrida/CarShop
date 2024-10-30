import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"
import { useState} from "react";
import CarDialogContent from "./CarDialogContent";

export default function EditCar( {editCar, currentCar}) {
    const [car, setCar] = useState(currentCar);
    const [open, setOpen] = useState(false);

    const url = currentCar._links.self.href;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setCar({...car, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        console.log(car);
        editCar(url, car);
        handleClose();
    };

    return (
        <>
        <Button onClick={handleClickOpen}>Edit</Button>
        <Dialog
        open={open}
        onClose={handleClose}>
            <DialogTitle>Car</DialogTitle>
            <CarDialogContent car={car} handleChange={handleChange} />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </>
    )
}