import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Table,
    Card,
    Button,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getServiceProviderCategories, addProviderServiceCategory, deleteServiceCategory } from "../../../../actions/ServiceProvider/serviceProviderActions";
import MaterialTextField from "../../../utilComponents/MaterialTextField";


let ProviderServices = (props) => {
    const history = useNavigate();
    const [addCategory, setAddCategory] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (props.auth.id) {
                await props.getServiceProviderCategories(props.auth.id);
            }
        }
        fetchData();
    }, [props.auth.id]);

    const createCategorySubmit = async (values) => {
        const category = {
            name: values.categoryName,
            description: values.categoryDescription,
            userId: props.auth.id
        }
        await props.addProviderServiceCategory(category, history);
        await props.getServiceProviderCategories(props.auth.id);
        props.reset();
        setAddCategory(false);
    }

    const handleCategoryDelete = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            await props.deleteServiceCategory(categoryId);
            await props.getServiceProviderCategories(props.auth.id);
        }
    }
    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h4">Your Service categories</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={() => setAddCategory(!addCategory)}>
                        Add Category
                    </Button>
                </Grid>
                <Grid item xs={12}>

                    {addCategory &&
                        <Card variant="outline">
                            <h1>Add category</h1>
                            <form onSubmit={props.handleSubmit(createCategorySubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            name="categoryName"
                                            fullWidth={true}
                                            component={MaterialTextField}
                                            type="text"
                                            label="Category Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="categoryDescription"
                                            fullWidth={true}
                                            multiline={true}
                                            rows={4}
                                            component={MaterialTextField}
                                            label="Category Description"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            startIcon={<Save />}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>
                        </Card>
                    }
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6">Category Name</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Edit</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Delete</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.provider.serviceCategories && props.provider.serviceCategories.map((category, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Typography variant="body1">{category.name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={() => history(`/provider/services/edit/${category.id}`)}>
                                                Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleCategoryDelete(category.id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}

function mapStateToProps(state, props) {
    return {
        auth: state.auth,
        provider: {
            serviceCategories: state.provider.serviceCategories
        }
    };
}

ProviderServices = connect(mapStateToProps, {
    getServiceProviderCategories,
    addProviderServiceCategory,
    deleteServiceCategory
})(ProviderServices);

ProviderServices = reduxForm({
    form: "ProviderServices",
    enableReinitialize: true,
})(ProviderServices);

export default ProviderServices;