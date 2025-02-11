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
import { addblog } from './apicall';
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useNavigate } from 'react-router-dom';
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

const Addblog = () => {

    const navigate = useNavigate();
    const authorName = localStorage.getItem("name");

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null); // For Image

    const onSubmit = async (data, e) => {
        e.preventDefault(); // For to stop default behavour
        setLoading(true);
        // Handling Form Data 
        const formdata = new FormData();
        formdata.append("title", data.title);
        formdata.append("image", image);
        formdata.append("description", data.description);

        try {
            const response = await addblog(formdata)
            console.log("Blog Create Response...", response);
            if (response && response?.data?.success === true) {
                reset()
                navigate('/yourblog')
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
                                Blog posting by {authorName}
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

                                    {/*This form section is for the submit image*/}
                                    <Grid item xs={12}>
                                        <div style={{ marginBottom: '20px' }}>
                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                            {image !== "" && image !== undefined && image !== null ? (
                                                <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                                            ) : (
                                                <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                                            )}
                                        </div>
                                    </Grid>
                                    {/*Image area end*/}

                                    {/* Blog description */}
                                    <Grid item xs={12}>
                                        <TextField
                                            name="description"
                                            required
                                            fullWidth
                                            id="description"
                                            label="Blog Description"
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
                                    {loading ? <CircularProgress size={24} /> : "Post Blog"}
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

export default Addblog