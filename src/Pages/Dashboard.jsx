import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Grid from '@mui/material/Grid2';
import Footer from '../Components/Footer'
import { getAllGrievanceAPI, updateGrievanceStatusAPI } from '../Services/allApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [allGrievance, setAllGrievance] = useState([])
    const [allGrievanceDummy, setAllGrievanceDummy] = useState([])
    const [show, setShow] = useState(false);
    const [selectedGrievance, setSelectedGrievance] = useState({})
    const [grievance, setGrievance] = useState({
        userId: "", fullName: "", email: "", category: "", grievance: "", location: "", grvncStatus: ""
    })
    const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            getAllGrievance()
        } else {
            toast.warning("Please Login!")
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        if (grievance.grvncStatus) {
            const grievanceToEdit = allGrievance.find(grievance => grievance._id === selectedGrievanceId);
            updateGrievanceStatus(grievanceToEdit);
        }
    }, [grievance]);

    const getAllGrievance = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            //api call
            try {
                const result = await getAllGrievanceAPI(reqHeader)
                console.log(result.data);
                console.log(result.data.reverse());
                
                if (result.status == 200) {
                    setAllGrievance(result.data.reverse())
                    setAllGrievanceDummy(result.data.reverse())
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleSearch = (categy) => {
        setAllGrievance(allGrievanceDummy.filter(grievance=>grievance.category.toLowerCase().includes(categy)))
    }

    const handleClose = () => {
        setShow(false);
        setSelectedGrievance({})
    }
    const handleShow = () => setShow(true);

    const handleModal = (id) => {
        allGrievance.find(grievance => grievance._id == id && setSelectedGrievance(grievance))
        handleShow()
    }

    const updateGrievanceStatus = async (grievanceToEdit) => {
        console.log(grievance.userId, grievance.fullName, grievance.email, grievance.category, grievance.grievance, grievance.location, grievance.grvncStatus);

        if (grievance.userId && grievance.fullName && grievance.email && grievance.category && grievance.grievance && grievance.location && grievance.grvncStatus) {
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await updateGrievanceStatusAPI(grievanceToEdit._id, grievance, reqHeader)
                    if (result.status == 200) {
                        console.log(result);
                        getAllGrievance()
                        setGrievance({
                            userId: "", fullName: "", email: "", category: "", grievance: "", location: "", grvncStatus: ""
                        })
                    } else {
                        toast.warning(result.response.data)
                    }
                } catch (error) {
                    toast.warning(error.response.data)
                    console.log(error);
                }
            } else {
                toast.warning("Token missing, Please login!")
            }
        } else {
            toast.warning("Some fields are missing! Try again after some times!")
        }
    }

    const handleChange = (event, id) => {
        const grievanceToEdit = allGrievance.find(grievance => grievance._id == id)
        setSelectedGrievanceId(id)
        setGrievance({ userId: grievanceToEdit.userId, fullName: grievanceToEdit.fullName, email: grievanceToEdit.email, category: grievanceToEdit.category, grievance: grievanceToEdit.grievance, location: grievanceToEdit.location, grvncStatus: event.target.value })
        // console.log(grievanceToEdit);
        // updateGrievanceStatus(grievanceToEdit,grievance)
    };

    console.log(allGrievance);
    // console.log(selectedGrievance);
    // console.log(grievance);


    return (
        <>
            <div className='dashboardMainDiv'>
                <Header />
                <input onChange={(e)=>{handleSearch(e.target.value.toLowerCase())}} style={{ width: "260px" }} type="text" className='rounded p-1 border-1 ms-5 mt-4' placeholder="Search By Category!!" />
                <div className='d-flex flex-column align-items-center orderContainer pb-5' style={{ minHeight: "100vh", width: "100%" }}>
                    <Grid container spacing={2} className="w-100">
                        {allGrievance.length > 0 ?
                            allGrievance.map(grievance => (
                                <Grid key={grievance?._id} item size={12}>
                                    {/* orders container */}
                                    <div className='orderDetailsBox'>
                                        {/* division of container to 3 */}
                                        <Grid container spacing={0} sx={{ minHeight: "109px" }}>
                                            {/* 1st col */}
                                            <Grid item size={{ xs: 12, sm: 4 }} onClick={() => handleModal(grievance?._id)}>
                                                <div className='h-100'>
                                                    <h5 className='categoryHeader'>{grievance?.category}</h5>
                                                    <p>{grievance?.grievance.slice(0, 31)}...</p>
                                                </div>
                                            </Grid>
                                            {/* 2nd col */}
                                            <Grid item size={{ xs: 12, sm: 4 }} onClick={() => handleModal(grievance?._id)} className='flex justify-sm-end'>
                                                <div className='h-100'>
                                                    <p className='location'>{grievance?.location}</p>
                                                </div>
                                            </Grid>
                                            <Grid item size={{ xs: 0, sm: 1 }} onClick={() => handleModal(grievance?._id)} className='flex justify-sm-end'>
                                            </Grid>
                                            {/* 3rd col */}
                                            <Grid item size={{ xs: 12, sm: 3 }} className='flex justify-sm-end'>
                                                <div className='h-100 flex justify-center pt-1'>
                                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <Select
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={grievance?.grvncStatus}
                                                            onChange={e => handleChange(e, grievance?._id)}
                                                            label="Age"
                                                        >
                                                            <MenuItem value={10}><p className='orderDetailsHeading ps-2 status text-warning'>Processing</p></MenuItem>
                                                            <MenuItem value={20}><p className='orderDetailsHeading ps-2 status'>Completed</p></MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </Grid>
                                        </Grid>

                                    </div>
                                </Grid >
                            ))
                            :
                            <div className='fw-bolder text-danger m-5 text-center'>No grievance to show</div>
                        }
                    </Grid >
                </div >
            </div>
            <Footer/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Grievance Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField className='w-100' slotProps={{ input: { readOnly: true } }} id="outlined-basic" label="name" variant="outlined" value={selectedGrievance?.fullName} />

                    <TextField className='w-100 mt-4' slotProps={{ input: { readOnly: true } }} id="outlined-basic" label="email" variant="outlined" value={selectedGrievance?.email} />

                    <TextField className='w-100 mt-4' slotProps={{ input: { readOnly: true } }} id="outlined-basic" label="category" variant="outlined" value={selectedGrievance?.category} />

                    <TextField className='w-100 mt-4' id="outlined-multiline-static" label="Grievance" multiline rows={4} defaultValue="Default Value" slotProps={{ input: { readOnly: true } }} value={selectedGrievance?.grievance} />

                    <TextField className='w-100 mt-4' slotProps={{ input: { readOnly: true } }} id="outlined-basic" label="location" variant="outlined" value={selectedGrievance?.location} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='colored' autoClose={1000} />

        </>
    )
}

export default Dashboard
