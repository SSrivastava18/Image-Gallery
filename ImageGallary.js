import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';


function ImageGallary() {
    const [imageList, setImageList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchImages = async () => {
        try {
            const url = 'http://localhost:8000/api/images';
            const result = await fetch(url);
            const { data } = await result.json();
            console.log(data);
            setImageList(data);
        } catch (err) {
            alert('Internal Server Error, Please try again')
        }
    }

    useEffect(() => {
        fetchImages();
    }, [])

    const onDrop = async (acceptedFiles) => {
        console.log('acceptedFiles---', acceptedFiles)
        setLoading(true);
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('images', file);
        });
        try {
            const options = {
                method: 'POST',
                'Content-Type': 'multipart/form-data',
                body: formData
            }
            const url = 'http://localhost:8000/api/images/upload-images'
            const result = await fetch(url, options);
            const { data, message } = await result.json();
            fetchImages()
            setLoading(false);
            toast['success'](message)
        } catch (err) {
            console.log('Error while uploading images ', err);
            toast['error'](err)
        }
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
            <h1 className='mb-4'>Image Gallary App</h1>
            <div {...getRootProps()} className='dropzone'>
                <input {...getInputProps()} />
                <p>Drag & drop some files here, or click to select files</p>
            </div>
            {loading && (
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}
            {/* List of Images */}
            <div className='d-flex flex-column w-100 mt-4'>
                <div className='image-grid'>
                    {
                        imageList.map((image, index) => (
                            <div key={index} className='image-card'>
                                <Link className='text-decoration-none' to={`/${image._id}`}>
                                    <img src={image.imageURL} alt={image.originalName} />
                                    <p>{image.originalName}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />

        </div>
    )
}

export default ImageGallary