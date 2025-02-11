import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { singleblog, editblog } from './apicall';
import { useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from "@mui/material"; // Circle Loader  
import Wrapper from '../Common/Wrapper';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                CRUD webside
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

const Editblog = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const authorName = localStorage.getItem("name");

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null); // For Image

    // Get task For Single Value (Start)
    const getBlog = async () => {
        try {
            const response = await singleblog(id);
            console.log("Single response...", response);
            const reg = {
                title: response?.title,
                subtitle: response?.subtitle,
                image: response?.image,
                description: response?.description,
                author: response?.author
            };
            reset(reg)
            return response
        } catch (error) {
            console.log(error);
        }
    };

    const { data: singledata } = useQuery({ queryFn: getBlog, queryKey: ['singleblog', id] }) // 
    // Get product For Single Value (End)

    console.log("My single data...", singledata);

    const onSubmit = async (data, e) => {
        e.preventDefault(); // For to stop default behavour
        setLoading(true);
        // Handling Form Data 
        const formdata = new FormData();
        formdata.append("title", data.title);
        formdata.append("subtitle", data.subtitle);
        formdata.append("image", image || singledata.image);
        formdata.append("description", data.description);
        formdata.append("author", data.author);

        try {
            const response = await editblog({ formdata, id })
            console.log("Blog Update Response...", response);
            if (response && response?.status === 200) {
                navigate('/blog')
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setLoading(false)
        }
    }

    return (
        <>
            <Wrapper>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 10,
                                padding: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: 2,
                                backgroundColor: 'white',
                                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.12)'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <EditIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                Edit Blog
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
                                <Grid container spacing={3}>

                                    {/* Blog title */}
                                    <Grid item xs={12}>
                                        <TextField
                                            name="title"
                                            required
                                            fullWidth
                                            id="title"
                                            label="Title"
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            autoFocus
                                            {...register("title")}

                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(25, 118, 210, 0.5)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1976d2',
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>

                                    {/* Blog subtitle */}
                                    <Grid item xs={12}>
                                        <TextField
                                            name="subtitle"
                                            required
                                            fullWidth
                                            id="subtitle"
                                            label="Subtitle"
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            autoFocus
                                            {...register("subtitle")}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(25, 118, 210, 0.5)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1976d2',
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>

                                    {/*Handle Image Area Start*/}
                                    <Grid item xs={12}>
                                        <div style={{ marginBottom: '20px' }}>
                                            <input
                                                type="file"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                name="image"
                                                accept="image/*"
                                                className="form-control"
                                            />

                                            {image ? (
                                                <img
                                                    height="180px"
                                                    src={URL.createObjectURL(image)}
                                                    alt="Uploaded"
                                                    className="upload-img"
                                                />
                                            ) : (
                                                <img
                                                    height="180px"
                                                    src={`${process.env.REACT_APP_BASE_URL}${singledata?.image}`}
                                                    alt="Existing Employee"
                                                    className="upload-img"
                                                />
                                            )}
                                        </div>
                                    </Grid>
                                    {/*Handle Image area end*/}

                                    {/* Blog description */}
                                    <Grid item xs={12}>
                                        <TextField
                                            name="description"
                                            required
                                            fullWidth
                                            id="description"
                                            label="Blog Description"
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            autoFocus
                                            {...register("description")}
                                            multiline
                                            rows={4}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(25, 118, 210, 0.5)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1976d2',
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>

                                    {/* Author name */}
                                    <Grid item xs={12}>
                                        <TextField
                                            name="author"
                                            required
                                            fullWidth
                                            id="author"
                                            value={authorName}
                                            readonly
                                            label="Author"
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            autoFocus
                                            {...register("author")}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(25, 118, 210, 0.5)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1976d2',
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 4,
                                        mb: 2,
                                        paddingY: 1.2,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        backgroundColor: '#1976d2',
                                        '&:hover': {
                                            backgroundColor: '#125a9e',
                                        },
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Edit Blog"}
                                </Button>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5, color: '#888' }} />
                    </Container>
                </ThemeProvider>

            </Wrapper>

        </>
    )
}

export default Editblog