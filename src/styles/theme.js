import { createMuiTheme } from "@mui/material";
import { adaptV4Theme } from '@mui/material/styles';
const theme = createMuiTheme(adaptV4Theme({
  palette: {
    primary: { 500: "#467fcf" },
  },
  typography: {
    fontFamily: ["Raleway", "Arial"].join(","),
  },
}));
export default theme;
