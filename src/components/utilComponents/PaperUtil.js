import { Paper } from "@mui/material"

const PaperUtil = (props) => {
    console.log(props)
    return <Paper {...props} elevation={12} />
}

export default PaperUtil;