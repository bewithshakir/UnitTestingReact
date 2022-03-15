import { Typography } from "@mui/material";
import './DisclaimerTextBox.scss';

type props = {
    text: string
}

export default function DisclaimerTextBox({ text }: props) {
    return (
        <Typography color="#000000DE" variant="h5" px={1} pt={1} pb={1} pl={2} className="disclaimerTextBox">
            {text}
        </Typography>
    );
}